import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface Prop {
    selected: Date | undefined
    setSelected: React.Dispatch<React.SetStateAction<Date | undefined>>
}

const DatePicker: React.FC<Prop> = ({selected, setSelected}) => {
    
    const highlightedDates: Date[] = [
    new Date(2025, 7, 1),
    new Date(2025, 7, 11)
    ];

    return (
        <div className="w-full flex justify-center fixed bottom-0 left-0 z-[100]">
            <div className="border rounded-md w-max p-4 flex shadow-md bg-white">
                <DayPicker
                    mode="single"
                    selected = {selected}
                    onSelect={setSelected}
                    navLayout="around"
                    showOutsideDays={true}
                    disabled={{after: new Date()}}
                    modifiers={{
                        highlighted: highlightedDates
                    }}
                    modifiersClassNames={{
                        highlighted: 'bg-[#4d47c3] text-white rounded-full '
                    }}
                    classNames={{
                        footer:"mt-2 text-center"
                    }}
                    footer={
                        selected ? `Selected: ${selected.toLocaleDateString("en-GB", {day:"numeric", month:"short", year:"numeric"})}` : "Pick a day."
                    }
                />
             </div>
        </div>
    )
}

export default DatePicker;