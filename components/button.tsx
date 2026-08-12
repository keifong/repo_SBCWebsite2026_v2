import "../app/globals.css"

type ButtonProps = {
    title: string
}

function Button({title}: ButtonProps) {
    return (
        <button className="button_sbc">
            {title}
        </button>
    )
}

export default Button