import AssistantCard from "@/components/AssistantCard"
// import SearchInput from "@/components/SearchInput"
// import SubjectFilter from "@/components/SubjectFilter"
import { getAllAssistants } from "@/lib/actions/companion.actions"

const AssistantsLibrary = async ({ searchParams } : SearchParams) => {
    const filters = await searchParams
    // const subject = filters.subject ? filters.subject : ''
    // const topic = filters.topic ? filters.topic : ''
    
    const assistants = await getAllAssistants({  })

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Assistant Library</h1>
                <div className="flex gap-4">
                    {/* <SearchInput />
                    <SubjectFilter /> */}
                </div>
            </section>
            <section className="companions-grid">
                {assistants.map(assistant => (
                    <AssistantCard
                        key={assistant.id} 
                        { ... assistant }
                    />
                ))}
            </section>
        </main>
    )
}

export default AssistantsLibrary