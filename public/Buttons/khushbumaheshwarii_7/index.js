$(document).ready(function() {
	var count = 0;
	$("a.add-to-cart").click(function(event) {
		count++;
		$("a.add-to-cart").addClass("size");
		setTimeout(function() {
			$("a.add-to-cart").addClass("hover");
		}, 200);
		setTimeout(function() {
			$("a.cart > span").addClass("counter");
			$("a.cart > span.counter").text(count);
		}, 400);
		setTimeout(function() {
			$("a.add-to-cart").removeClass("hover");
			$("a.add-to-cart").removeClass("size");
		}, 600);
		event.preventDefault();
	});
});