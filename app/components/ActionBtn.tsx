import { IconType } from "react-icons";

interface ActionBtnProps{
    icon:IconType
    onClick:(e:React.MouseEvent<HTMLButtonElement>) => void
    disabled?:boolean
    }
    const ActionBtn:React.FC<ActionBtnProps> = ({icon:Icon,onClick,disabled}) => {
        return ( 
            <button 
            className={ `flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 ${disabled && 'opacity-50 cursor-not-allowed '}`}
             onClick={onClick} 
            disabled={disabled}>
            <Icon size={18}/>
            </button>
         );
    }
     
    export default ActionBtn;