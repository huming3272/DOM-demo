const span = dom.create('<span class="ddd">ddd</span>')
dom.after(dom.find('.sp')[0],span)

const parent = dom.create('<div class="parent">ppp</div>')
dom.wrap(span,parent)

