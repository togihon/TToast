# TToast
This is a simple javascript library to create a toast in a web. Still under development but you can use it now.

# How To Use
1. Download js files and place it to your project folder. (cdn soon)
2. Include the js file into your project (ex. in index.html)
3. To show a toast, use this code:

```
TToast({
  text: 'Your text',
  position: 'bottom|center',
  fontsize: 'normal',
  color: 'Font Color',
  background: 'Background color',
  icon: 'Your Icon',
})
```
# The Attributes
All attributes must be written in lowercase.  
  
`position` must be written in `pos1|pos2` format.  
pos1 : top, middle, bottom  
pos2 : left, center, right

`fontSize` : small, normal, large  
`color` and `background` : you can use all color format (HEX, RGB, RBGA, etc.)  
`icon` : this is optional. if you want to use this, you have to include an icon kit.  
for example i want to use FontAwesome and i included the kit into my project.  
in `icon` attribute, just fill the class name (**fas fa-check**).

