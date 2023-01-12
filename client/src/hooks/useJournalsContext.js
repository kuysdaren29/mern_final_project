import { JournalsContext } from "../context/JournalContext";
import { useContext } from "react";


export const useJournalsContext = () => {
    const context = useContext(JournalsContext)

    if (!context) {
        throw Error('useJournalsContext must be used inside a JournalContextProvider')
    }

    return context
}