import React from 'react';
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import { addDays, subDays } from 'date-fns';
const DateRange = () => {
    const [state, setState] = useState([
        {
            startDate: subDays(new Date(), 0),
            endDate: addDays(new Date(), 0),
            key: "selection"
        }
    ]);
    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        setState([selection]);
    };
    const handleExtraMenu = (type) => {
        if (type === "This year") {
            const now = new Date();
            const year = now.getFullYear();
            const firstDayOfYear = new Date(year, 0, 1);
            const formatDate = [{
                selection: {
                    startDate: firstDayOfYear,
                    endDate: now,
                    key: "selection"
                }
            }]
            handleOnChange(formatDate[0])
        }
        else if (type === "Last year") {
            const now = new Date();
            const year = now.getFullYear();
            const lastDayOfPrevYear = new Date(year - 1, 11, 31);
            const formatDate = [{
                selection: {
                    startDate: lastDayOfPrevYear,
                    endDate: now,
                    key: "selection"
                }
            }]
            handleOnChange(formatDate[0])
        }
    };

    const formattedDate = (date) => {
        return date.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
    }
    return (
        <div className="date-range">
            <DateRangePicker
                onChange={handleOnChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                ranges={state}
                direction="horizontal"
            />
            <div className='extra-menu'>
                <button type="button" onClick={() => handleExtraMenu('This year')} className="rdrStaticRange"><span className="rdrStaticRangeLabel">This year</span></button>
                <button type="button" onClick={() => handleExtraMenu('Last year')} className="rdrStaticRange"><span className="rdrStaticRangeLabel">Last year</span></button>
                <button type="button" onClick={() => handleExtraMenu('This year')} className="rdrStaticRange"><span className="rdrStaticRangeLabel">All time</span></button>
            </div>
            <div className="date-range-main">
                <div className="date-range-data">
                    <div className="rdrDateDisplay" style={{ color: 'rgb(62,207,142)' }}><span className="rdrDateInput rdrDateDisplayItem rdrDateDisplayItemActive"><input placeholder="Early"
                        value={formattedDate(state[0].startDate)}
                    /></span>
                        <span className='date-range-mid'>-</span>
                        <span className="rdrDateInput rdrDateDisplayItem">
                            <input placeholder="Continuous"
                                value={formattedDate(state[0].endDate)}
                            /></span>
                    </div>
                </div>
            </div>
            <div className='submit-section'>
                <button className='cancel-btn'>
                    Cancel
                </button>
                &nbsp;
                <button className='apply-btn'>
                    Apply
                </button>
            </div>
        </div>
    );
};

export default DateRange;