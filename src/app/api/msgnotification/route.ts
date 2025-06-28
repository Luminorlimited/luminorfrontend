import { NextResponse } from "next/server";

// Handle SSE directly in the GET function
export async function GET(req: Request) {
  try {
    // Extract 'id' from the URL's search parameters (e.g., /api/msgnotification?id=123)
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    // Check if the id is available
    if (!id) {
      // Handle the case when id is not provided in the query params
      return NextResponse.json({ error: "ID parameter is missing" }, { status: 400 });
    }
    // Create a ReadableStream for SSE
    const stream = new ReadableStream({
      start(controller) {
        const sendData = async () => {
          try {
            // Fetch the message count from the API using the id
            const response = await fetch(
              `https://api.luminor-ltd.com/api/v1/notification/message-count/${id}`
            );
            const data = await response.json();

            // Send the data as an SSE message
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`)
            );
          } catch (error) {
            // In case of an error, send a failure message
            controller.enqueue(
              new TextEncoder().encode(
                `data: ${JSON.stringify({ error: "Failed to fetch data" })}\n\n`
              )
            );
            console.log(error);
          }
        };

        // Send initial data immediately
        sendData();

        // Notify the client about message count every few seconds
        const interval = setInterval(sendData, 10000);

        // Close the connection on client disconnect using AbortSignal
        if (req.signal) {
          req.signal.addEventListener("abort", () => {
            clearInterval(interval);
            controller.close();
          });
        }
      },
    });

    return new NextResponse(stream); // Return the streaming response
  } catch (error) {
    // Log and return a generic error in case of failure
    console.error("Error with SSE:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
