//счетчик
let counter = 1;
$(".plus").click(function(){
	 counter++;
	 $('.col').text(counter)
});

$(".minus").click(function(){
	if(counter == 0) return;
	counter--;
    $('.col').text(counter)
});
//корзина
const backet = [];

let product = {id: 41, name: "Fall Limited Edition Sneakers", image: "./images/image-product-1-thumbnail.jpg", price: 125};

$(".add-cart").click(function(){
	if(counter == 0) return;
	let target = backet.find(function(prod){ return prod.id == product.id; });

	if (target) target.count += counter; 
	else backet[backet.push(product) - 1].count = counter;

	counter = 1;
	$('.col').text(counter);

	redrawBacket();
});

function redrawBacket(){
	$(".prod-container > div").html("");
	backet.forEach(function(v){
		let itemTemplate = `<div class="prod" data-id="${v.id}">
				  			<img src="${v.image}" alt="">
					  			<div class="cont-prod">
					  			<span>${v.name}</span>
					  			<div class="prod-price">
						  			<span>$${v.price} x ${v.count}</span>
						  			<span>$${v.price * v.count}</span>
					  			</div>
				  			</div>
				  			<img class="del-prod" src="./images/icon-delete.svg">
				  		</div>`;
	
		$(itemTemplate).appendTo(".prod-container > div");
	});

	$(".cont-win").removeClass("show");
	$(".prod-container").removeClass("show");
	if(backet.length > 0) $(".prod-container").addClass("show");
	else $(".cont-win").addClass("show");
}


$(document).on("click", ".del-prod", function(e){
	let target = backet.find(function(prod){ return prod.id == product.id; });
	if (!target) return;
	let index = backet.indexOf(target);
	backet.splice(index, 1);
	redrawBacket();
});

$(".backet").hover(function(e){
	$(".backet").addClass("show");
},function(e){
	$(".backet").removeClass("show");
});

//слайдер
$(".product-img > img").click(function(e){
	let href = e.target.src.replace("-thumbnail", "");
	$(".main-img > img")[0].src = href;
});

$(document).ready(function(){
	let child = $(".product-img > img:first-child");
	if(child.length > 0){
		let href = child[0].src.replace("-thumbnail", "");
		$(".main-img > img")[0].src = href;
	}
	redrawBacket();
});