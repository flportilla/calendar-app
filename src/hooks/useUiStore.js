import { useSelector, useDispatch } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice"

export const useUiStore = () => {

    const {
        isDateModalOpen
    } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? closeDateModal()
            : openDateModal()
    }

    return {

        //*properties
        isDateModalOpen,

        //*Methods
        openDateModal,
        closeDateModal,
    }

}