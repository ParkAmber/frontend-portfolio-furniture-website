/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  generateBuildId: () => "frontend-portfolio-furniture-web",

  //아래주소들만 out폴더로 만들어주기!(getServerSideProps있는 페이지는 제외시키기!)
  exportPathMap: () => ({
    "/": { page: "/" },
    "/portfolio": { page: "/portfolio" },
    "/designer/products": { page: "/designer/products" },
    "/designer/products/new": { page: "/designer/products/new" },
    "/website": { page: "/website" },
    "/website/login": { page: "/website/login" },
    "/website/products": { page: "/website/products" },
    "/weather": { page: "/weather" },
    "/website/products/cart": { page: "/website/products/cart" },
    "/website/products/payment": { page: "/website/products/payment" },
    "/website/products/totalPayment": { page: "/website/products/totalPayment" },
    "/website/reset": { page: "/website/reset" },
    "/website/signup": { page: "/website/signup" },
    "/resume": { page: "/resume" },

    "/404": { page: "/404" }
  })
  
}

module.exports = nextConfig
