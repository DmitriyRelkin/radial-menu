function RadialMenu(styles={}) {
    let {borderColor, borderWith} = styles;
    this.menu = document.createElement('ul');
    this.svg = document.createElement('svg');
    this.svg.id = 'svg';
    let s = Snap(this.svg);
    // Lets create big circle in the middle:
    let bigCircle = s.circle(150, 150, 120);
    // By default its black, lets change its attributes
    bigCircle.attr({
        fill: "#bada55",
        stroke: "#000",
        strokeWidth: 5
    });


    this.btnOpen = document.createElement('button');
    this.btnOpen.classList.add('btnOpen');
    this.btnOpen.innerHTML="open child";
    this.btnOpen.onclick = this.children;

    this.btnClose = document.createElement('button');
    this.btnClose.classList.add('btnClose');
    this.btnClose.innerHTML="close child";
    this.btnClose.onclick = this.close;

    this.menu.classList.add('radial-menu');
    this.menu.style.border = `${borderWith}`+'px solid '+`${borderColor}`;

    document.body.appendChild(this.menu);
    document.body.appendChild(this.btnOpen);
    document.body.appendChild(this.btnClose);
    document.body.appendChild(this.svg);

    return this;
}

//function aded item main item
RadialMenu.prototype.add = function(text='item', styles={}) {

  return new RadialMenuItem(this, text, styles);
};

//function for close all items
RadialMenu.prototype.children = function () {
  this.li = document.querySelectorAll('.inner-menu-item');
  for (var i = 0; i < this.li.length; i++) {
    this.li[i].classList.add('open-item');
  }
}

//function for open all items
RadialMenu.prototype.close = function () {
  this.li = document.querySelectorAll('.inner-menu-item');
  for (var i = 0; i < this.li.length; i++) {
    this.li[i].classList.remove('open-item');
  }
}

//finction for create main structure
function RadialMenuItem(parent, text, styles={}) {
  let that = this;
  this.style = styles;
  this.li = document.createElement('li');
  let {borderColor, borderWith, background} = this.style;
  this.li.style.border = `${borderWith}`+'px solid '+`${borderColor}`;
  this.li.style.backgroundColor = `${background}`;

  this.li.innerHTML = `${text}`;
  this.li.classList.add('inner-menu-item');
  this.menu = document.createElement('ul');
  this.menu.classList.add('inner-menu');
  this.createStructure(parent);
}

//finction for create structure
RadialMenuItem.prototype.createStructure = function (parent) {
  this.controlMenuItems();
  parent.menu.appendChild(this.li);
  this.li.appendChild(this.menu);
}

RadialMenuItem.prototype.createStructure = function (parent) {
  this.controlMenuItems();
  parent.menu.appendChild(this.li);
  this.li.appendChild(this.menu);
}

//function aded item child item
RadialMenuItem.prototype.add = function (text='item-inner', styles={}) {
  return new RadialMenuItem(this, text, styles);
}

//function for close all child-items
RadialMenuItem.prototype.close = function () {
  let openItems = document.querySelectorAll('.open-item');
  for(var i = 0; i < openItems.length; i++) {
    if(openItems[i] == this.li) {
      let nextItems = i;
      for (var i = nextItems; i < openItems.length; i++) {
        openItems[i].classList.remove('open-item');
      }
    }
  }
}

//function for open all child-items
RadialMenuItem.prototype.open = function () {
  let openItems = document.querySelectorAll('.inner-menu-item');
  for(var i = 0; i < openItems.length; i++) {
    if(openItems[i] == this.li) {
      let nextItems = i;
      for (var i = nextItems; i < openItems.length; i++) {
        openItems[i].classList.add('open-item');
      }
    }
  }
}


//function for control items menu
RadialMenuItem.prototype.controlMenuItems = function () {
  this.li.onclick = function (e) {
    let openItems = document.querySelectorAll('.open-item');
    let itemOpened = document.querySelectorAll('.item-opened');
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.classList.add('open-item');

    if (this.classList.contains('item-opened')) {
      for(var i = 0; i < openItems.length; i++) {
        if(openItems[i] == this) {
          let nextItems = i;
          for (var i = nextItems; i < openItems.length; i++) {
            openItems[i].classList.remove('open-item');
          }
        }
      }
    } else {
      setTimeout(() => {
        this.classList.add('item-opened');
      },200);
    }
  };
}

let generalMenu = new RadialMenu({
  borderWith:1,
  borderColor:'#f4c360'
});

let newItem1 = generalMenu.add('внешний-1',{
  borderWith:1,
  borderColor:'red',
  background:'yellow'
});
let newItem11 = newItem1.add('внутренний-1', {
  borderWith:1,
  borderColor:'green',
  background:'red'
});
let newItem111 = newItem11.add('внутренний-2', {
  borderWith:1,
  borderColor:'orange',
  background:'green'
});

let newItem1111 = newItem111.add('внутренний-3', {
  borderWith:1,
  borderColor:'red',
  background:'blue'
});
let newItem11111 = newItem1111.add('внутренний-4');
let newItem111111 = newItem11111.add('внутренний-5');
let newItem2 = generalMenu.add('внешний-2', {
  borderWith:1,
  borderColor:'red',
  background:'#b8b8ff'
});

//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
let buttonCloseChilds = document.querySelector('.closeChilds');
let openCloseChilds = document.querySelector('.openChilds');
buttonCloseChilds.addEventListener("click", function () {
  newItem111.close();
});

openCloseChilds.addEventListener("click", function () {
  newItem111.open();
});
