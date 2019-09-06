var ic = "https://icon-library.net/images/white-down-arrow-icon/white-down-arrow-icon-9.jpg";
var MenuComponent = {
  list : [],
  parentEl : null,
  menuId : "",
  contentId : "",
  routeData : {},
  render : function(list, id, nId, num){
   var parent = document.getElementById(id);
     list.forEach((item , i) => {
      var elem = document.createElement('div');
      var innerT = document.createElement('a');
      elem.id= id+":"+i;
      elem.className = "menu_style";
      innerT.id= nId+"_"+i;
      innerT.innerHTML = item.title;
      innerT.className = "link_style";
      setMarginPadding(elem, num);
      if(item.subList && item.subList.length > 0){
        var icon =  document.createElement('img');
        innerT.appendChild(icon);
         icon.src = ic;
         icon.className = "icon_closed";
         if(item.display){
         icon.className = "icon_open";
        }
      }
      elem.appendChild(innerT);
      parent.appendChild(elem);
      if(item.display){
       if(item.subList && item.subList.length > 0){
        this.render(item.subList, elem.id,innerT.id, num+1 );
        }
      }
    });
  },
  renderContent : function(idlist){
    var data = this.routeData;
    var breadCrumbList = this.getBreadCrumbs(idlist);
    var contentEl  = document.getElementById(this.contentId);
    contentEl.innerHTML = "";
     var bread_div = document.createElement('div');
     bread_div.id = this.menuId+"breadcrumb"
     bread_div.className ="bread_crumb_div";


    breadCrumbList.forEach((item , i) => {
      var elem = document.createElement('div');
      elem.className = "crumb";
      elem.innerHTML = item.title;
      elem.id = item.id;
      bread_div.appendChild(elem);
    });


    contentEl.appendChild(bread_div);
    var elem = document.createElement('p');
     elem.innerHTML = data.title;
     elem.className = "content_p";
     contentEl.appendChild(elem);
    var elem2 = document.createElement('p');
     elem2.innerHTML = description;
     elem2.className = "content_des";
     contentEl.appendChild(elem2);
  },
 destroyMenu : function(){
     this.parentEl.innerHTML = "";
 },
 getBreadCrumbs : function(idlist){
   var breadCrumbList = [];
   var updatedList = {};
   var list = this.list;
   var l =  idlist.length;
    if(l > 0 ){

     idlist.forEach((item, i) => {
       var id = "crumb";

       for(var j = 0; j <= i; j++ ){
         id = id +"_"+ idlist[j];
       }
       if( i === 0){
          updatedList  = list[item];
        }else {
          updatedList = updatedList.subList[item];
        }
      var obj = {id :id, title : updatedList.title };
      breadCrumbList.push(obj);

     });
    }
   return breadCrumbList;
 },
 getClickedNode : function(idlist){
    var list = this.list;
    var updatedList = {};
    var l =  idlist.length;
    if(l > 0 ){
     idlist.forEach((item, i) => {
       if( i === 0){
          updatedList  = list[item];
        }else {
          updatedList = updatedList.subList[item];
        }
     });
    }
   if(!updatedList.title){
     return null;
   }
   return updatedList;
 },
 updateNode : function(e){
  var id = e.target.id;
  var idlist = id.split("_");
  idlist.shift();
  var updatedList = this.getClickedNode(idlist);
  if(!updatedList){
    return;
  }
   updatedList.display = !updatedList.display;
  // if(!updatedList.subList || updatedList.subList.length < 1){  -- if we want to display data of only the very child which doesn't have sublist
           console.log("can reach")
           this.routeData = updatedList;
           this.renderContent(idlist);
           window.location = "#"+ idlist.join("/");
  //   }
   this.destroyMenu();
   this.render(this.list, this.menuId, this.menuId, 0);
 },
 init : function(id, contentId, list){
    this.list = list;
    this.parentEl = document.getElementById(id);
    this.menuId = id;
    this.contentId = contentId;
    this.render(list, id, id, 0);
    document.addEventListener('click', function(event){
     MenuComponent.updateNode(event);
   });
  }
}
var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
var data = [{title : "Car", display : true,
             subList : [{title : "private", display : false,
                        subList: [{title : "Diesel", display : false,
                                    subList : [
                                       {title : "Honda" , display :false },
                                       {title : "Maruti" , display :false },
                                       {title : "Hyundai" , display :false },
                                       {title : "Tesla" , display :false }
                                    ]
                             },
                                 {title : "Petrol", display : true},
                                 {title : "CNG", display : true},
                                 {title : "Electricity", display : true}]
                        },
                       {title : "Commercial", display : true}
                       ]
            },
            {title : "Bike", display : true,
            subList : [{title : "Normal", display : true,},
                       {title : "Sports", display : true}
                       ]}
           ];
MenuComponent.init("menu","content", data);
function getColor(num){
  if(num == 0){
    return "#6266fd";
  }
  if(num == 1){
    return "#565aec";
  }
  if(num == 2){
    return "#494ccc";
  }
  if(num == 3){
    return "#4548c1";
  }
  if(num == 4){
    return "#3b3ea9";
  }
  if(num == 5){
    return "#30328e"
  }
return "#26276f"
}
function setMarginPadding(el, num){
    var padding = 30*num;
    var margin = -(padding - 30);
    if(padding === 0){
      margin = 0;
    }
    el.style.marginLeft=margin+"px";
    el.style.marginRight=margin+"px";
    el.style.paddingLeft=padding+"px";
    el.style.paddingRight=padding+"px";
    el.style.backgroundColor=getColor(num);
}
