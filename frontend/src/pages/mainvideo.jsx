export const Light = () => {
    return (
        <div className = "bg-[#faf9fe] flex flex-row justify-center w-full">
            <div className = "bg-[#faf9fe] w-[1440px] h-[1095px] relative">
                <div className = "absolute w-[738px] h-[828px] top-[142px] left-[158px]">
                    <div className = "absolute w-[738px] h-[828px] top-0 left-0 bg-white rounded-xl" />

                    <div className = "flex flex-col w-[658px] items-start gap-[30px] absolute top-[611px] left-[30px]">
                        <div className = "flex flex-wrap h-[194px] items-start gap-[20px_20px] relative self-stretch w-full">
                            <div className = "w-[659px] h-[135px] items-start px-4 py-2.5 mr-[-1.00px] rounded-lg border-solid border-variable-collection-grey flex gap-2.5 relative">
                                <div className = "relative flex-1 mt-[-1.00px] font-p font-[number:var(--p-font-weight)] text-variable-collection-grey text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
                                    Comment
                                </div>
                            </div>
                            <button className "all-[unset] box-border w-[170px] h-9 items-center justify-center px-6 py-2.5 bg-[#030391] rounded-3xl flex gap-2.5 relative">
                                <div className = "relative flex-1 mt-[-1.00px] font-p font[number:var(--p-font-weight)] text-variable-collection-white text-[length:var(--a-font-size)] tracking-[var(--a-letter-spacing)] leading-[var(--a-line-height)] whitespace-nowrap [font-style:var(--a-font-style)]">
                                    Comment
                                </div>
                            </button>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
}