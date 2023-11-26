import { products } from "@/utils/Products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div>
          {products.map((product:any) =>{
            return <div>
              {product.name}
            </div>
          })}
        </div>
      </Container>
    </div>
  )
}
