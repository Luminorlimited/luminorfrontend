import { useSelector } from "react-redux";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RootState } from "@/redux/store";

interface DecodedToken extends JwtPayload {
    id: string;
    role?: string;
}

const useDecodedToken = (): DecodedToken | null => {
    const token = useSelector((state: RootState) => state.Auth.token);

    if (!token) return null;

    try {
        return jwt.decode(token) as DecodedToken;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export default useDecodedToken;
