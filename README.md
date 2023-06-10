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
  fontSize: 'normal',
  color: 'Font Color',
  background: 'Background color',
})
```
# The Attributes
Right now, there are three attributes working. They are `text`, `position`, and `fontSize`.  
All attributes must be written in lowercase.  
  
`position` must be written in `pos1|pos2` format.  
pos1 : top, middle, bottom  
pos2 : left, center, right

`fontSize` : small, normal, large

