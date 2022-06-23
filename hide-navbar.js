var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
    // document.getElementById("account-sidebar").style.top = "110px";
  } else {
    document.getElementById("navbar").style.top = "-85px";
    // document.getElementById("account-sidebar").style.top = "50px";
  }
  prevScrollpos = currentScrollPos;
}