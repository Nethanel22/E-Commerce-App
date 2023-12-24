// tailwind  css
// sticky= position: sticky=
// when scroll down the nav don't scroll down
// w-full=width:100%
// z-30=z-index:30
// shadow-sm=small shadow
// py-4=padding y up and down 16px
// border-b-[1px]=border-bottom-width: 1px;
// items-center=align-items: center;
// hidden=display: none
// md:block=@media (min-width: 768px) {
//     .md\:block {
//         display: block;
//     }
// }
// gap-8=gap:2rem
// md:gap-12=
// @media (min-width: 768px) {
//     .md\:gap-12 {
//         gap: 3rem/* 48px */;
//     }
// }
// 
// 
import Link from "next/link";
import Container from "../Container";
// google fonts
import { Redressed } from "next/font/google";
const redressed=Redressed({subsets:['latin'],weight:["400"]})
const NavBar = () => {
    return ( 
    <div className="
    sticky top-0 
    w-full
  bg-slate-200 
  z-30
  shadow-sm

  "

  ><div className="py-4 border-b-[1px]">
<Container>
    <div className="flex items-center justify-between gap-3 md:gap-0 ">
        <Link href='/' className={`${redressed.className} font-bold text-2xl `}> E-Shop</Link>
        <div className="hidden md:block">Search</div>
        <div className="flex items-center gap-8 md:gap-12">
            <div>CartCount</div>
            <div>UserMenu</div>
        </div>
    </div>
</Container>
    </div>
    </div> 
    );
}
 
export default NavBar;