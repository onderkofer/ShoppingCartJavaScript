

const itemsBox=document.getElementById("items");
const cartBox=document.getElementById("cart");
const moneyToPay=document.getElementById("subtotal");
const bag=document.getElementById("cartIcon");


function loadProducts(){ //Loads all the products from products.js and displays them in the main html page
    products.forEach((product)=>{
        itemsBox.innerHTML+=`
        
        <div class=" boxbox"><!--StartItem1-->
        <div class="image h-75">
            <img class="w-100 h-100" src="${product.imgSrc}" alt="">
        </div>
        <div class="cost text-center">
            <span>${product.description}</span>
            <span>${product.price}€</span>
            <button class="purchase" type="submit" onclick="add(${product.id})" >BUY</button>
        </div>
    </div> <!--EndItem 1-->
        `
    })
}
loadProducts();



let cart= JSON.parse(localStorage.getItem("CART")) || []; //array which will save all the products in the shopping cart
sendToCart();


function add(prodId){ //function that adds the items to the cart array from which we render the items

    if(cart.some((item)=>item.id===prodId)){
        changeUnits("plus", prodId) //calling the changeUnits function here increments the units in the cart if we press the buy button in the main div with items
    }
    else{
        const item=products.find((product)=>product.id===prodId);
        cart.push({
            ...item,
            numbUnits:1
        });
    }
    sendToCart();
}


function sendToCart(){ 
    sendItem();
    sendTotal();

    localStorage.setItem("CART", JSON.stringify(cart));
}

function sendItem(){ //function that renders the items which are stored in the cart array
    cartBox.innerHTML="";
    cart.forEach((item)=>{
        cartBox.innerHTML+=`
        <div class="bb2">
        <div class=" h-75" onclick="remove(${item.id})">
            <img class="w-100 h-100" src="${item.imgSrc}" alt="">
        </div>
        <div class="cartItem text-center">
            <span>${item.name}</span>
            <span>${item.price}€</span>
            <button id="plusItem" onclick="changeUnits('minus',${item.id})">-</button>
            <span id="unitsNum">${item.numbUnits}</span>
            <button id="minusItem" onclick="changeUnits('plus',${item.id})">+</button>
        </div>
    </div>
        `
    })
}

function sendTotal(){ //function that shows the total price and total number of items

    let subtotal=0, totalItems=0;
    cart.forEach((item)=>{
        subtotal+=item.price*item.numbUnits;
        totalItems+=item.numbUnits;
    });

    moneyToPay.innerHTML=`subtotal: ${subtotal.toFixed(2)}€ --for-- ${totalItems} items`;
    bag.dataset.count=totalItems;
}



function openNav() { // openNav and closeNav are functions which will open and close the cart as a sidenav
    document.getElementById("itemMenu").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("itemMenu").style.width = "0";
  }




  function changeUnits(action, id){ //function that updates the number of units for each item in the cart

    cart = cart.map((item)=>{
        let numbUnits=item.numbUnits;
        
        if(item.id===id){
            if(action==="minus" && numbUnits>1){
                numbUnits--;
            }else if(action==="plus"){
                numbUnits++;
            }
        }
        return{
            ...item,
            numbUnits
        }
    })
    sendToCart();
  }




  function remove(id){ //function that removes items from the cart filters the cart array and leaves every item inside except for the selected one
    cart=cart.filter((item)=>item.id!==id);
    sendToCart();
  }