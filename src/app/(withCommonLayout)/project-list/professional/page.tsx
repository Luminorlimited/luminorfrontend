import ProjectList from "../ProjectList";
type ProjectListProps = {
    filteredData: {
        id: number;
        industry: string;
        timeline: string;
        skillType: string;
    }[];
};


export default function Page({filteredData}: ProjectListProps) {
    return (
        <>
            <ProjectList FilteredData={filteredData} />
        </>
    );
}