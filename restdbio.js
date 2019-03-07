        window.addEventListener("DOMContentLoaded", init);

        const productGrid = document.querySelector("div#product-block-grid");
        const productBlock = document.querySelector("template#product-block-template").content;
        let arrayOfCatProducts = [];

        const addNewProductBtn = document.querySelector("button#add");
       

        const catProduct = {
            name: "--Product Name--",
            buyprice: "--Buy Price From Aliexpress",
            sellprice: "--Sell Price To Customers",
            profit: "--Potential Profit--",
            link: "--Aliexpress Link--",
            img:"--Image Link--",
            id: "--ID--"
        }

        function init(){
            get();
        }

        function get(){
            fetch("https://petproducts-747b.restdb.io/rest/cat-toys", {
                method: "get",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-apikey": "5c7cf1fbcac6621685acbafa",
                    "cache-control": "no-cache"
                }
                })
                .then(e => e.json())
                .then(prepareProducts);
            }
            

            const postProduct = {
                name: "Soft Stuffed Fish Cat Toy",
                buyprice: "0.68",
                sellprice: "14.99",
                link: "https://www.aliexpress.com/item/Pet-Soft-Plush-Creative-3D-Carp-Fish-Shape-Cat-Toy-Gifts-Catnip-Fish-Stuffed-Pillow-Doll/32956305894.html?spm=2114.search0104.3.156.790d74bedFiBqV&ws_ab_test=searchweb0_0,searchweb201602_5_10065_10068_319_317_10696_10084_453_10083_454_10618_10304_10307_10820_10821_537_10302_536_10902_10059_10884_10887_321_322_10103,searchweb201603_6,ppcSwitch_0&algo_expid=949bc822-6175-4112-845e-29421d33bd60-18&algo_pvid=949bc822-6175-4112-845e-29421d33bd60&transAbTest=ae803_3",
                image:"https://ae01.alicdn.com/kf/HTB1HcJ7sXYqK1RjSZLeq6zXppXaR/Pet-Soft-Plush-Creative-3D-Carp-Fish-Shape-Cat-Toy-Gifts-Catnip-Fish-Stuffed-Pillow-Doll.jpg",
        }

         addNewProductBtn.addEventListener("click", ()=> {
             post(postProduct);
             
            })

            
        
        function post(newPetProduct){
            fetch("https://petproducts-747b.restdb.io/rest/cat-toys", {
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-apikey": "5c7cf1fbcac6621685acbafa",
                    "cache-control": "no-cache"
                },
                body: JSON.stringify(newPetProduct)
                })
                .then(res => res.json())
                .then(data => console.log(data));
            }
            

        function prepareProducts(data){
            console.log(data);
            productBlock.innerHTML = "";
            data.forEach(product => {
                let newProduct = Object.create(catProduct);

                newProduct.name = product.name;
                newProduct.buyprice = product.buyprice;
                newProduct.sellprice = product.sellprice;
                newProduct.link = product.link;
                newProduct.profit = product.profit;
                newProduct.id = product._id;
                newProduct.image = product.image;
                //TO DO Push these to an array instead later

                //TO DO Use this to display the array instead later
                const clone = productBlock.cloneNode(true);
                clone.querySelector("img#image").src = newProduct.image;
                clone.querySelector("h2#name").textContent = newProduct.name;
                clone.querySelector("p#buyprice span").textContent = `$${newProduct.buyprice}`;
                clone.querySelector("p#sellprice span").textContent = `$${newProduct.sellprice}`;
                clone.querySelector("p#profit span").textContent = `$${newProduct.profit}`;
                clone.querySelector("a#link").href = newProduct.link;
                
                clone.querySelector("button#remove").addEventListener("click", (e) => {
                    e.target.parentElement.remove();
                    removeProduct(product._id);
                });
                
                productGrid.appendChild(clone);
            })
            
        }

        function removeProduct(id){
            fetch(`https://petproducts-747b.restdb.io/rest/cat-toys/${id}`, {
                method: "delete",
                headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-apikey': "5c7cf1fbcac6621685acbafa",
                "cache-control": "no-cache"
                }
            })
            .then(res=>res.json())
            .then(data=>console.log(data));

            
        }

        
