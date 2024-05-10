interface AuthInputProps {
    newState: (state: string) => void,
    label: string,
    type: string,
    htmlForAndNameAndId: string
}
function AuthInput(props: AuthInputProps) {
    return (
        <div className="flex flex-col items-start justify-between">
            <label htmlFor={props.htmlForAndNameAndId}>{props.label}</label>
            <input
                type={props.type}
                name={props.htmlForAndNameAndId}
                id={props.htmlForAndNameAndId}
                required
                onChange={(e) => props.newState(e.currentTarget.value)}
                className="py-2 px-3 border-gray-400 border-b w-full focus-visible:border-gray-600 focus-visible:border-b focus-visible:outline-none" />
        </div>
    );
}
export default AuthInput;