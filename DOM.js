window.dom = {
    create(string){
      //创造一个节点
        const container = document.createElement('template')
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node,node2){
      //往元素的后面添加节点
        node.parentNode.insertBefore(node2,node.nextSibling)
    },
    before(node,node2){
      //往元素的前面添加节点
        node.parentNode.insertBefore(node2, node)
    },
    append(parent,node){
        //往元素中添加节点
        parent.appendChild(node)
    },
    wrap(node,parent){
        // 把作为外套的元素写在后面
        dom.before(node,parent)  
        dom.append(parent,node)
    },
    remove(node){
        node.parentNode.removeChild(node)
        //移除当前元素
        return node
    },
    /**/
    empty(node){
        //把目标元素清空然后返回清空的部分
        const array = []
        let firstChild = node.firstChild
        while(firstChild){
          array.push(dom.remove(node.firstChild))
          firstChild = node.firstChild
        }
        return array
      },
      attr(node, name, value){ // 重载
        //给节点添加属性,三个参数的时候进行设置，两个参数的时候读取属性
        if(arguments.length === 3){
          node.setAttribute(name, value)
        }else if(arguments.length === 2){
          return node.getAttribute(name)
        }
      },
      text(node, string){ // 适配
        //往节点中写入文本，两个属性时设置文本，一个属性时读取文本
        if(arguments.length ===2 ){
          if('innerText' in node){
            node.innerText = string 
          }else{
            node.textContent = string 
          }
        }else if(arguments.length === 1){
          if('innerText' in node){
            return node.innerText
          }else{
            return node.textContent
          }
        }
      },
      html(node, string){
        //往节点中写入html，两个属性时设置，一个属性时读取
        if(arguments.length === 2){
          node.innerHTML = string
        }else if(arguments.length === 1){
          return node.innerHTML 
        }
      },
      style(node, name, value){
        //给节点设置css样式,三个属性时设置，两个属性时读取，
        //第二个属性是包含css属性的对象时，遍历后赋值给style样式
        if(arguments.length===3){
          // dom.style(div, 'color', 'red')
          node.style[name] = value
        }else if(arguments.length===2){
          if(typeof name === 'string'){
            // dom.style(div, 'color')
            return node.style[name]
          }else if(name instanceof Object){
            // dom.style(div, {color: 'red'})
            const object = name
            for(let key in object){
              node.style[key] = object[key]
            }
          }
        }
      },
      class: {
        add(node, className){
          //添加class
          node.classList.add(className)
        },
        remove(node, className){
          //移除class
          node.classList.remove(className)
        },
        has(node, className){
          //确定class中有无某个className
          return node.classList.contains(className)
        }
      },
      on(node, eventName, fn){
        //添加监听事件
        node.addEventListener(eventName, fn)
      },
      off(node, eventName, fn){
        //取消监听事件
        node.removeEventListener(eventName, fn)
      },
      find(selector,scope){
        //通过选择器找到某个节点，一个属性时全局查找，两个属性时限制范围查找
        return (scope||document).querySelectorAll(selector)
        // 返回一个数组
    },
      parent(node){
        //找到节点的父元素
        return node.parentNode
      },
      children(node){
        //找到节点的子元素
        return node.children
      },
      siblings(node){
        //找到节点的兄弟元素
        return Array.from(node.parentNode.children)
        .filter(n=>n!==node)
      },
      next(node){
        //找到节点的下一个元素
        let nextSibling = node.nextSibling
        while(nextSibling && nextSibling.nodeType === 3){
          nextSibling = nextSibling.nextSibling
        }
        return nextSibling
      },
      previous(node){
        //找到节点的上一个元素
        let previousSibling = node.previousSibling
        while(previousSibling && previousSibling.nodeType === 3){
          previousSibling = previousSibling.previousSibling
        }
        return previousSibling
      },
      each(nodeList, fn){
        //找到节点的每个元素并且执行函数
        for(let i=0;i<nodeList.length;i++){
          fn.call(null, nodeList[i])
        }
      },
      index(node){
        //找到节点的索引
        const list = dom.children(node.parentNode)
        let i
        for(i=0;i<list.length;i++){
          if(list[i] === node){
            break
          }
        }
        return i
      }
    
}
