import { useDispatch } from 'react-redux';

import { FilterLabel } from 'components/Filter/Filter.styled';
import { setFilter } from 'redux/filterSlice';

export function Filter() {
    const dispatch = useDispatch();

    function handleChange(e) {
        dispatch(setFilter(e.target.value));
    }

    return (
        <FilterLabel>
            <p>Find contacts by name</p>
            <input name="filter" type="text" onChange={handleChange} />
        </FilterLabel>
    );
}
