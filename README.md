# Furniture Website
+ Demo:

https://github.com/ParkAmber/frontend-portfolio-furniture-website/assets/106687981/17780cf6-74c0-4736-b741-44486d76dfff


  
### **Overview:** 
This project revolves around a furniture website, where I assumed responsibility for the entire development process—from web design and frontend development to backend implementation and production deployment. My primary focus centered on crafting seamless login/signup functionalities on both the frontend and backend, emphasizing login authorization and authentication. The core features encompass search, payment processing, file uploads, and orchestrating the controlled flow of data between the frontend and backend.

### **Project Objective:** 
My goal was to bring to life a meticulously designed website, crafted with a focus on appealing to potential employers in the thriving e-commerce industry. The intention was to showcase my ability to independently handle the entire process. Recognizing the paramount importance of online stores in the digital landscape, I aimed to develop an e-commerce platform that mirrors real services widely embraced by users.

Given my personal fondness for furniture, my aspirations extended to creating a dedicated e-commerce platform for furniture enthusiasts. This endeavor was driven by a desire to provide an authentic and immersive service in the furniture retail space. The passion for furniture and the vision of a user-friendly and visually appealing website became the driving force behind the initiation of this personal project.

This project serves as a testament to my commitment to crafting websites that not only meet but exceed the expectations of the e-commerce market. The dedication to user-friendly design and visual aesthetics is a key aspect that sets this project apart and aligns with the evolving needs of the dynamic e-commerce landscape.

### **Development Goals:** 
Implementing the entire development process from web design to production. understanding of the interaction between frontend and backend components, fostering a holistic approach to web development.

### **Sills:** 
+ HTML
+ CSS
+ TypeScript
+ React.js
+ Next.js
+ Nest.js
+ Node.js
+ GraphQL

-------
+ **Challenges:**

1. Product Management Complexity: Managing diverse product data, including images, catagories, and pricing, presented challenges during CRUD API implementation.
2. User Experience Optimization: Streamlining the logout process to enhance the overall user experience, especially in the context of customer accounts and security.
3. Security Concerns with Tokens: Overcoming CORS issues related to token storage, transmission, and backend processing is crucial for securing user data and transactions in an e-commerce environment.
4. Concurrency in Checkout: Tackling deadlocks, particularly during high-traffic periods, to ensure smooth and concurrent processing of customer transactions.
5. Code Optimization: Addressing refactoring needs, particularly eliminating redundant code with props.
6. Dynamic Content Rendering: Mitigating unnecessary rerenders, particularly when dealing with dynamically changing product listings or user interactions.
7. Frontend Performance for Catalogs: Minimizing reflows when displaying extensive product catalogs to maintain a responsive and efficient frontend.

+ **Solutions:**

1. To address the data combination issue in DB, I adopted a strategy of saving each distinct dataset and facilitating dependency injection.
2. Enhanced Security Measures: Utilizing advanced security measures, such as Redis for token blacklisting and Docker deployment, to fortify user data protection in an e-commerce context.
3. Secure Checkout Processes: Configuring cookie settings securely, employing setHeader options, and ensuring httponly options to protect against potential security threats during the checkout process.
4. Transaction Handling: Standardizing transaction sequences to handle simultaneous checkout processes and prevent transaction conflicts.
5. Abandoning the use of props through the implementation of custom hooks.
6. Dynamic Content Optimization: Employing memoization techniques to efficiently handle dynamic content rendering, improving overall frontend performance.
7. Efficient Catalog Display: Implementing measures to establish fixed heights for data placements, reducing reflows and enhancing the efficiency of product catalog displays.

-------

### **Advanced Feature:** 
+ Login Functionality : Implementing the process of obtaining tokens using cookies, enhancing the security and efficiency of user authentication during login.
  
![login](https://github.com/ParkAmber/frontend-portfolio-furniture-website/blob/main/login_page.png)

    const onClickLogin = async (data: IFormData) => {
      try {
        //1. Obtain access token through the login mutation.
        const result = await login({
          variables: { email: data.email, password: data.pw },
        });
        console.log(result);
        const accessToken = result.data?.login;
        console.log(accessToken);

      //2. Store the obtained access token in the global state.
      if (accessToken === undefined) {
        alert("Login fail!! please try again..");
        return;
      }
      setAccessToken(accessToken);

      //3. Navigate to the successful login page.
      void router.push("/");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
    };



    
+ Payment Functionality : Integration of payment processing using the "Import" library for seamless transactions.
  
![total payment](https://github.com/ParkAmber/frontend-portfolio-furniture-website/blob/main/pyment_total_page.png)

![payment_one](https://github.com/ParkAmber/frontend-portfolio-furniture-website/blob/main/payment_page.png)

      useEffect(() => {
      const script = document.createElement("script"); //<script></script>tag
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
  
      document.head.appendChild(script); 
      script.onload = () => {
      if (window.IMP) {
        const { IMP } = window;
        IMP.init("imp"); // Example: imp00000000
        IMP.loadUI("paypal-spb", requestData, function (rsp: any) {
          try {
            axios
              .post(
                "https://backend.amberpark.net/graphql",
                {
                  query: `
                  mutation {
                    createPointTransaction(impUid: "${rsp.imp_uid}", amount: ${requestData.amount}){
                      id
                      status
                    }
                  }
                `,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((response) => {
                if (response.data) {
                  console.log(response, response.data.data);
                  if (
                    response.data?.data?.createPointTransaction.status ===
                    "PAYMENT"
                  ) {
                    alert("Payment successful!");
                    router.push(visitedPage);
                  }
                  // Handle any additional logic here after a successful request
                }
              });
          } catch (error) {
            alert(error);
          }
        });
      }
      };
      }, []);
      
