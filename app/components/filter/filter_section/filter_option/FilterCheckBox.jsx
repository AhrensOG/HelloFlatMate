
export default function FilterCheckBox({ name }) {
    return (
        <form>
            <div className="flex gap-3 justify-between w-full h-[5vh] items-center">
                <label className="text-base pb-[3px] font-normal" htmlFor={name.replace(" ", "_")}>
                    {name}
                </label>
                <input className="h-[1.1rem] w-[1.1rem] border-[2px]" type="checkbox" id={name.replace(" ", "_")} />
            </div>
        </form>

    )
}