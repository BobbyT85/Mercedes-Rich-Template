FT.manifest({
  "filename": "index.html",
  "width": 300,
  "height": 250,
  "clickTagCount": 1,
  "hideBrowsers": ["ie8"],
  
  "videos": [
    { "name": "video", "ref": "114524/glb_rich_300x250"}
  ],

  "instantAds": [
    { "name": "dynamicText1", "type": "text", "default": "The new GLB." },
    { "name": "text1Duration", "type": "text", "default": "2.95" },

    { "name": "dynamicText2", "type": "text" , "default": "Space for every<br>adventure." },
    { "name": "text2Duration", "type": "text", "default": "3.7" },

    { "name": "dynamicText3", "type": "text", "default": "And whatever<br>life throws at you." },
    { "name": "text3Duration", "type": "text", "default": "3.2" },

    { "name": "dynamicText4", "type": "text", "default": "The new GLB.<br>All kinds of strength." },
    { "name": "text4Duration", "type": "text", "default": "1.6" },

    { "name": "dynamicCtaText", "type": "text", "default": "Discover more" },

    { "name": "dynamicLogo", "type": "image", "default": "images/logoB_300x250.png" },

    {
      "name": "dynamicTermsText",
      "type": "text",
      "default": "Lorem ipsum dolor sit amet, consectetuer adipiscing <br/>elit. Aenean commodo ligula eget dolor. Aenean<br />massa. Cum sociis natoque penatibus."
    },

    { "name": "dynamicBackground", "type": "image", "default": "images/poster_300x250.jpg" },
    { "name": "loops", "type": "text", "default": "0" },
    { "name": "endframePause", "type": "text", "default": "0" },
    { "name": "autoplay", "type": "text", "default": "false" },
    { "name": "muted", "type": "text", "default": "false" }
  ]
});
