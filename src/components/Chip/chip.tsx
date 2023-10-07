import { getContrastingTextColor } from '@/utils/Colors.utils'

export interface ChipProps {
    backgroungColor: string,
    textColor?: string,
    textContent: string
}

const Chip: React.FC<ChipProps> = ({ backgroungColor, textColor = 'black', textContent }) => {
    return (
        <span
            className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${getContrastingTextColor(textColor)}`}
            style={{ backgroundColor: backgroungColor }}
        >
            {textContent}
        </span>
    )
}
export default Chip