<p align="center" width="100%"><img width="33%" src="https://i.ibb.co/jyb1q7k/Screenshot-2.png"</img><br>
A simple and lightweight javascript library to create a toast on your website. <br> 
Read documentation: https://togi-simaremare.my.id/ttoast/
</p>
 

# How To Use
1. Download js files and place it to your project folder **OR** you can use jsdelivr CDN 
2. Include the js file into your project (ex. in index.html)  
```
<script src="https://cdn.jsdelivr.net/gh/togihon/TToast@854b02dce32c5531332afb6d41b5088019207045/ttoast.js"></script>
```
3. To show a toast, use this code:

```
TToast({
  text: 'Your text',
  position: 'bottom|center',
  fontsize: 'normal',
  color: 'Font Color',
  background: 'Background color',
  icon: 'fas fa-check',
})
```
# The Attributes  
All attributes must be written in lowercase.  
- `text` : this will be shown to the user  
- `position` must be written in `pos1|pos2` format.  
pos1 : top, middle, bottom  
pos2 : left, center, right  
- `fontSize` : small, normal, large  
- `color` and `background` : you can use all color format (HEX, RGB, RBGA, etc.)  
- `icon` : this one is optional. But, if you want to use this you have to include an icon kit. For example i use FontAwesome so the kit is already included in my project. To show a `check icon` in FontAwesome we use   `<i class="fas fa-check"></i>`.  
But, in `icon` attribute, just fill the class name (**fas fa-check**).

