//WebP
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});

//========================================================

//ImageBackGround
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();

//========================================================
// Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let body = document.querySelector("body");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", (e) => {
		if (!body.classList.contains("wait")) {
			body_lock(delay);
			iconMenu.classList.toggle("active");
			menuBody.classList.toggle("active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.toggle("active");
	menuBody.classList.toggle("active");
}

//========================================================

//BodyLock
function body_lock(delay) {
	var body = document.querySelector("body");
	if (body.classList.contains('lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}

function body_lock_remove(delay) {
	var body = document.querySelector("body");
	if (!body.classList.contains('wait')) {
		var lock_padding = document.querySelectorAll(".lp");
		setTimeout(function () {
			for (var index = 0; index < lock_padding.length; index++) {
				var el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("lock");
		}, delay);
		body.classList.add("wait");
		setTimeout(function () {
			body.classList.remove("wait");
		}, delay);
	}
}

function body_lock_add(delay) {
	var body = document.querySelector("body");
	if (!body.classList.contains('wait')) {
		var lock_padding = document.querySelectorAll(".lp");
		for (var index = 0; index < lock_padding.length; index++) {
			var el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("lock");
		body.classList.add("wait");
		setTimeout(function () {
			body.classList.remove("wait");
		}, delay);
	}
}
//========================================================
//Click
let user_icon = document.querySelector(".fullscreen__en");
user_icon.addEventListener("click", function (e) {
	let user_menu = document.querySelector(".fullscreen__en");
	user_menu.classList.toggle("active");
});

document.addEventListener("click", function (e) {
	// console.log(e);
	if (!e.target.closest(".fullscreen__en")) {
		let user_menu = document.querySelector(".fullscreen__en");
		user_menu.classList.remove("active");
	}
});

/*
let user_icon = document.querySelector(".link-recipes");
user_icon.addEventListener("click", function (e) {
	if (e.target.classList.contains("link-recipes") || e.target.parentNode.classList.contains("link-recipes")) {
		let user_menu = document.querySelector(".link-recipes__list");
		user_menu.classList.toggle("active");
		this.classList.toggle("active");
	}
});

document.addEventListener("click", function (e) {
	// console.log(e);
	if (!e.target.closest(".link-recipes")) {
		let user_menu = document.querySelector(".link-recipes__list");
		let parent = document.querySelector(".link-recipes");
		user_menu.classList.remove("active");
		parent.classList.remove("active");
	}
});
*/
/*
let vegan = document.querySelector(".vegan-only");
vegan.addEventListener("click", function (e) {
	let meat = document.getElementsByClassName("meat");
	for (let i = 0; i < meat.length; i++) {
		meat[i].classList.toggle("active");
	}
});
*/
//========================================================
//PopUp
const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelectorAll("body");
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute("href").replace("#", "");
			const curentPopup = document.getElementById(popupName).parentElement;
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener("click", function (e) {
			popupClose(el.closest(".popup"));
			e.preventDefault();
		});
	}
}
function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector(".popup.open");
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add("open");
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest(".popup__content")) {
				popupClose(e.target.closest(".popup"));
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove("open");
		if (doUnlock) {
			bodyUnLock();
		}
	}
}
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	document.body.style.paddingRight = lockPaddingValue;
	document.body.classList.add("lock");
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = "0px";
			}
		}
		document.body.style.paddingRight = "0px";
		document.body.classList.remove("lock");
	}, timeout);
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
document.addEventListener("keydown", function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector(".popup.open");
		popupClose(popupActive);
	}
});
//========================================================

