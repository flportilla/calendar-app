import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

describe('tests on uiSlice', () => {

    test('should return the default stat', () => {

        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy()

    })

    test('should toggle isDateModalOpen', () => {

        let state = uiSlice.getInitialState()

        state = uiSlice.reducer(state, onOpenDateModal)
        expect(state.isDateModalOpen).toBeTruthy()

        state = uiSlice.reducer(state, onCloseDateModal)
        expect(state.isDateModalOpen).toBeFalsy()


    })
})