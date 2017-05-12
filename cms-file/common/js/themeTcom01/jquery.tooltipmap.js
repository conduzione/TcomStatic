var $j = jQuery.noConflict();
(function($j) {

  $j.tooltipmap = {
    version: '1.2.5',

    // the HTML that will be used for the tooltip
    template: ['<div>',
      '<div class="tooltipmap-outer">',
		//Barra titolo e bottone close
        //'<h3 class="tooltipmap-title ui-widget-header ui-tooltipmap-header" style="color:#000000"></h3>',
         '<div class="tooltipmap-inner ui-tooltipmap-content" style="background-color: #ffffff;border: 1px solid #dddddd"></div>',
      '</div>',
      '<div class="tooltipmap-extra"></div>',
    '</div>'].join(''),

    /* tooltipmap setup
     *  the setup options are applied each time .tooltipmap() is called,
     *  BUT only if <div id="tooltipmap"> is not already in the document
    */
    setup: {
      // method to be used for inserting the tooltipmap into the DOM.
      // Permitted values are 'appendTo', 'prependTo', 'insertBefore', and 'insertAfter'
      insertionType: 'appendTo',
      // element in the DOM the plugin will reference when inserting the tooltipmap.
      insertionElement: 'body'
    },

    /*
     * tooltipmap options
     *
     * each one can be explicitly overridden by changing its value.
     * for example: $j.tooltipmap.defaults.width = 200;
     *         or: $j.fn.tooltipmap.defaults.width = 200; // for compatibility with previous tooltipmap versions
     * would change the default width for all tooltipmaps to 200.
     *
     * each one can also be overridden by passing an options map to the tooltipmap method.
     * for example: $j('a.example').tooltipmap({width: 200});
     * would change the default width to 200 for tooltipmaps invoked by a link with class of "example"
     *
    */
    defaults: {
      multiple:         false,    // Allow a new tooltip to be created for each .tooltipmap() call
      width:            200,      // The width of the tooltipmap
      height:           'auto',   // The height of the tooltipmap
      cluezIndex:       97,       // Sets the z-index style property of the tooltipmap
      positionBy:       'auto',   // Sets the type of positioning: 'auto', 'mouse','bottomTop', 'fixed'
      topOffset:        35,       // Number of px to offset tooltipmap from top of invoking element
      leftOffset:       0,       // Number of px to offset tooltipmap from left of invoking element
      local:            false,    // Whether to use content from the same page for the tooltipmap's body
      localPrefix:      null,     // string to be prepended to the tip attribute if local is true
      localIdSuffix:    null,     // string to be appended to the tooltipmap content element's id if local is true
      hideLocal:        true,     // If local option is set to true, this determines whether local content
                                  // to be shown in tooltipmap should be hidden at its original location
      attribute:        'rel',    // the attribute to be used for fetching the tooltipmap's body content
      titleAttribute:   'title',  // the attribute to be used for fetching the tooltipmap's title
      splitTitle:       '',       // A character used to split the title attribute into the tooltipmap title and divs
                                  // within the tooltipmap body. more info below [6]
      escapeTitle:      false,    // whether to html escape the title attribute
      showTitle:        true,     // show title bar of the tooltipmap, even if title attribute not set
      tooltipmapClass:  'default',// class added to outermost tooltipmap div in the form of 'tooltipmap-' + tooltipmapClass.
      hoverClass:       '',       // class applied to the invoking element onmouseover and removed onmouseout
      waitImage:        true,     // whether to show a "loading" img, which is set in jquery.tooltipmap.css
      cursor:           'help',
      arrows:           false,    // if true, displays arrow on appropriate side of tooltipmap
      dropShadow:       true,     // set to false if you don't want the drop-shadow effect on the tooltipmap
      dropShadowSteps:  0,        // adjusts the size of the drop shadow
      roma:           false,    // keep visible until manually closed
	  napoli:           false,    // keep visible until manually closed
	  milano:           false,    // keep visible until manually closed
	  firenze:           false,    // keep visible until manually closed
	  bologna:           false,    // keep visible until manually closed
	  torino:           false,    // keep visible until manually closed
	  pisa:           false,    // keep visible until manually closed
	  padova:           false,    // keep visible until manually closed
	  venezia:           false,    // keep visible until manually closed
	  bardonecchia:      false,    // keep visible until manually closed
	  genova:     false,    // keep visible until manually closed
		livorno:      false,    // keep visible until manually closed
		trieste:      false,    // keep visible until manually closed
		rimini:      false,    // keep visible until manually closed
		senigallia:      false,    // keep visible until manually closed
		sorrento:      false,    // keep visible until manually closed
		arezzo:      false,    // keep visible until manually closed
		rovereto:      false,    // keep visible until manually closed
		verona:     false,    // keep visible until manually closed
	  mouseOutClose:    true,    // close when tooltipmap is moused out
      activation:       'hover',  // set to 'click' to force user to click to show tooltipmap
                                  // set to 'focus' to show on focus of a form element and hide on blur
      clickThrough:     false,    // if true, and activation is not 'click', then clicking on link will take user to the link's href,
                                  // even if href and tipAttribute are equal
      tracking:         false,    // if true, tooltipmap will track mouse movement (experimental)
      delayedClose:     0,        // close tooltipmap on a timed delay (experimental)
      closePosition:    'top',    // location of close text for roma tooltipmaps; can be 'top' or 'bottom' or 'title'
      closeText:        'Close',  // text (or HTML) to to be clicked to close roma tooltipmaps
      truncate:         0,        // number of characters to truncate tooltipmap's contents. if 0, no truncation occurs

      // effect and speed for opening tooltipmaps
      fx: {
                        open:       'show', // can be 'show' or 'slideDown' or 'fadeIn'
                        openSpeed:  ''
      },

      // settings for when hoverIntent plugin is used
      hoverIntent: {
                        sensitivity:  3,
                        interval:     50,
                        timeout:      0
      },

      // short-circuit function to run just before tooltipmap is shown.
      onActivate:       function(e) {return true;},
      // function to run just after tooltipmap is shown.
      onShow:           function(ct, ci){},
      // function to run just after tooltipmap is hidden.
      onHide:           function(ct, ci){},
      // whether to cache results of ajax request to avoid unnecessary hits to server
      ajaxCache:        true,

      // process data retrieved via xhr before it's displayed
      ajaxProcess:      function(data) {
                          data = data.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm, '').replace(/<(link|meta)[^>]+>/g,'');
                          return data;
      },

      // can pass in standard $j.ajax() parameters. Callback functions, such as beforeSend,
      // will be queued first within the default callbacks.
      // The only exception is error, which overrides the default
      ajaxSettings: {
                        // error: function(ct, ci) { /* override default error callback */ },
                        // beforeSend: function(ct, ci) { /* called first within default beforeSend callback */ },
                        dataType: 'html'
      },
      debug: false

    }
  };
  var $jtooltipmapWait,
      standardClasses = 'tooltipmap ui-widget ui-widget-content ui-tooltipmap',
      caches = {},
      counter = 0,
      imgCount = 0;

  // use $j.fn.prop() if available (jQuery 1.6+); otherwise, $j.fn.attr()
  $j.fn.attrProp = $j.fn.prop || $j.fn.attr;

  // .tooltipmap() method
  $j.fn.tooltipmap = function(js, options) {
    var $jtooltipmap, $jtooltipmapInner, $jtooltipmapOuter, $jtooltipmapTitle, $jtooltipmapArrows, $jdropShadow;
    if (typeof js == 'object') {
      options = js;
      js = null;
    }
    if (js == 'destroy') {
      var data = this.data('tooltipmap');
      if ( data ) {
        $j(data.selector).remove();
        $j.removeData(this, 'title');
        $j.removeData(this, 'tooltipmap');
      }
      $j(document).unbind('.tooltipmap');
      return this.unbind('.tooltipmap');
    }

    // merge per-call options with defaults
    options = $j.extend(true, {}, $j.tooltipmap.defaults, options || {});

    /** =create tooltipmap divs **/
    counter++;
    var cluezIndex,
        tooltipmapId = $j.tooltipmap.backCompat || !options.multiple ? 'tooltipmap' : 'tooltipmap-' + counter,
        tooltipmapSelector = '#' + tooltipmapId,
        prefix = $j.tooltipmap.backCompat ? '#' : '.',
        insertionType = $j.tooltipmap.setup.insertionType,
        insertionElement = $j.tooltipmap.setup.insertionElement || 'body';

    insertionType = (/appendTo|prependTo|insertBefore|insertAfter/).test(insertionType) ? insertionType : 'appendTo';
    $jtooltipmap = $j(tooltipmapSelector);
    if (!$jtooltipmap.length) {

      $jtooltipmap = $j($j.tooltipmap.template)
      [insertionType](insertionElement)
      .attr('id', tooltipmapId)
      .css({position: 'absolute', display: 'none'});

      cluezIndex = +options.cluezIndex;
      $jtooltipmapOuter = $jtooltipmap.find(prefix + 'tooltipmap-outer').css({position: 'relative', zIndex: cluezIndex});
      $jtooltipmapInner = $jtooltipmap.find(prefix + 'tooltipmap-inner');
      $jtooltipmapTitle = $jtooltipmap.find(prefix + 'tooltipmap-title');
    }

    $jtooltipmapWait = $j('#tooltipmap-waitimage');
    if (!$jtooltipmapWait.length && options.waitImage) {
      $jtooltipmapWait = $j('<div></div>').attr('id', 'tooltipmap-waitimage').css({position: 'absolute'});
      $jtooltipmapWait.insertBefore($jtooltipmap).hide();
    }


    var tooltipmapPadding = (parseInt($jtooltipmap.css('paddingLeft'), 10) || 0) + (parseInt($jtooltipmap.css('paddingRight'), 10) || 0);


    this.each(function(index) {
      var link = this,
          $jlink = $j(this),
          // support metadata plugin (v1.0 and 2.0)
          opts = $j.extend(true, {}, options, $j.metadata ? $jlink.metadata() : $j.meta ? $jlink.data() : $jlink.data('tooltipmap') || {}),
          // start out with no contents (for ajax activation)
          tooltipmapContents = false,
          isActive = false,
          closeOnDelay = 0,
          tipAttribute = opts[opts.attribute] ||
            ( opts.attribute == 'href' ? $jlink.attr(opts.attribute) : $jlink.attrProp(opts.attribute) || $jlink.attr(opts.attribute) ),
          ctClass = opts.tooltipmapClass;

      cluezIndex = +opts.cluezIndex;
      $jlink.data('tooltipmap', {title: link.title, zIndex: cluezIndex, selector: tooltipmapSelector});

      if (opts.arrows && !$jtooltipmap.find('.tooltipmap-arrows').length) {
        $jtooltipmap.append('<div class="tooltipmap-arrows ui-state-default"></div>');
      }

      if (!tipAttribute && !opts.splitTitle && !js) {
        return true;
      }
      // if hideLocal is set to true, on DOM ready hide the local content that will be displayed in the tooltipmap
      if (opts.local && opts.localPrefix) {tipAttribute = opts.localPrefix + tipAttribute;}
      if (opts.local && opts.hideLocal && tipAttribute) { $j(tipAttribute + ':first').hide(); }

      var tOffset = parseInt(opts.topOffset, 10), lOffset = parseInt(opts.leftOffset, 10);
      // vertical measurement variables
      var tipHeight, wHeight,
          defHeight = isNaN(parseInt(opts.height, 10)) ? 'auto' : (/\D/g).test(opts.height) ? opts.height : opts.height + 'px';
      var sTop, linkTop, posY, tipY, mouseY, baseline;
      // horizontal measurement variables
      var tipInnerWidth = parseInt(opts.width, 10) || 275,
          tipWidth = tipInnerWidth + tooltipmapPadding + opts.dropShadowSteps,
          linkWidth = this.offsetWidth,
          linkLeft, posX, tipX, mouseX, winWidth;

      // parse the title
      var tipParts;
      var tipTitle = (opts.attribute != 'title') ? $jlink.attrProp(opts.titleAttribute) || '' : '';
      if (opts.splitTitle) {
        tipParts = tipTitle.split(opts.splitTitle);
        tipTitle = opts.showTitle || tipParts[0] === '' ? tipParts.shift() : '';
      }
      if (opts.escapeTitle) {
        tipTitle = tipTitle.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;');
      }

      var localContent;
      function returnFalse() { return false; }

/***************************************
* ACTIVATION
****************************************/

//activate tooltipmap
    var activate = function(event) {
      var pY, ajaxMergedSettings, cacheKey,
          continueOn = opts.onActivate.call(link, event);

      if (continueOn === false) {
        return false;
      }

      isActive = true;

      // activate function may get called after an initialization of a different target so need to re-get the Correct tooltipmap object here
      $jtooltipmap = $j(tooltipmapSelector).css({position: 'absolute'});
      $jtooltipmapOuter = $jtooltipmap.find(prefix + 'tooltipmap-outer');
      $jtooltipmapInner = $jtooltipmap.find(prefix + 'tooltipmap-inner');
      $jtooltipmapTitle = $jtooltipmap.find(prefix + 'tooltipmap-title');
      $jtooltipmapArrows = $jtooltipmap.find(prefix + 'tooltipmap-arrows');
      $jtooltipmap.removeClass().css({width: tipInnerWidth});
      if (tipAttribute == $jlink.attr('href')) {
        $jlink.css('cursor', opts.cursor);
      }
      if (opts.hoverClass) {
        $jlink.addClass(opts.hoverClass);
      }
      linkTop = posY = $jlink.offset().top;
      linkLeft = $jlink.offset().left;

      // FIX: (bug 4412)
      linkWidth = $jlink.innerWidth();
      if ( event.type == focus ) {
        // in focus event, no mouse position is available; this is needed with bottomTop:
        mouseX = linkLeft +  ( linkWidth / 2 ) + lOffset;
        $jtooltipmap.css({left: posX});
        mouseY = posY + tOffset;
      } else {
        mouseX = event.pageX;
        mouseY = event.pageY;
      }
      //END OF FIX

      if (link.tagName.toLowerCase() != 'area') {
        sTop = $j(document).scrollTop();
        winWidth = $j(window).width();
      }
// position tooltipmap horizontally
      if (opts.positionBy == 'fixed') {
        posX = linkWidth + linkLeft + lOffset;
        $jtooltipmap.css({left: posX});
      } else {
        posX = (linkWidth > linkLeft && linkLeft > tipWidth) ||
          linkLeft + linkWidth + tipWidth + lOffset > winWidth ?
          linkLeft - tipWidth - lOffset :
          linkWidth + linkLeft + lOffset;
        if (link.tagName.toLowerCase() == 'area' || opts.positionBy == 'mouse' || linkWidth + tipWidth > winWidth) { // position by mouse
          if (mouseX + 20 + tipWidth > winWidth) {
            $jtooltipmap.addClass('tooltipmap-' + ctClass);
            posX = (mouseX - tipWidth - lOffset) >= 0 ? mouseX - tipWidth - lOffset - parseInt($jtooltipmap.css('marginLeft'),10) + parseInt($jtooltipmapInner.css('marginRight'),10) :  mouseX - (tipWidth/2);
          } else {
            posX = mouseX + lOffset;
          }
        }
        pY = posX < 0 ? event.pageY + tOffset : event.pageY;
        if (posX < 0 || opts.positionBy == 'bottomTop') {
          posX = (mouseX + (tipWidth/2) > winWidth) ? winWidth/2 - tipWidth/2 : Math.max(mouseX - (tipWidth/2),0);
        }
      }

      $jtooltipmapArrows.css({zIndex: $jlink.data('tooltipmap').zIndex+1});
      $jtooltipmap.css({
        left: posX,
        zIndex: $jlink.data('tooltipmap').zIndex
      });
      wHeight = $j(window).height();

/***************************************
* load a string from tooltipmap method's first argument
***************************************/
      if (js) {
        if (typeof js == 'function') {
          js = js.call(link);
        }
        $jtooltipmapInner.html(js);
        tooltipmapShow(pY);
      }
/***************************************
* load the title attribute only (or user-selected attribute).
* tooltipmap title is the string before the first delimiter
* subsequent delimiters place tooltipmap body text on separate lines
***************************************/

      else if (tipParts) {
        var tpl = tipParts.length;
        $jtooltipmapInner.html(tpl ? tipParts[0] : '');
        if (tpl > 1) {
          for (var i=1; i < tpl; i++){
            $jtooltipmapInner.append('<div class="split-body">' + tipParts[i] + '</div>');
          }
        }
        tooltipmapShow(pY);
      }
/***************************************
* load external file via ajax
***************************************/

      else if ( !opts.local && tipAttribute.indexOf('#') !== 0 ) {
        if (/\.(jpe?g|tiff?|gif|png)(?:\?.*)?$j/i.test(tipAttribute)) {
          $jtooltipmapInner.html('<img src="' + tipAttribute + '" alt="' + tipTitle + '" />');
          tooltipmapShow(pY);
        } else {
          var optionBeforeSend = opts.ajaxSettings.beforeSend,
              optionError = opts.ajaxSettings.error,
              optionSuccess = opts.ajaxSettings.success,
              optionComplete = opts.ajaxSettings.complete;

          cacheKey = getCacheKey(tipAttribute, opts.ajaxSettings.data);

          var ajaxSettings = {
            cache: opts.ajaxCache, // force requested page not to be cached by browser
            url: tipAttribute,
            beforeSend: function(xhr, settings) {
              if (optionBeforeSend) {optionBeforeSend.call(link, xhr, $jtooltipmap, $jtooltipmapInner, settings);}
              $jtooltipmapOuter.children().empty();
              if (opts.waitImage) {
                $jtooltipmapWait
                .css({top: mouseY+20, left: mouseX+20, zIndex: $jlink.data('tooltipmap').zIndex-1})
                .show();
              }
            },
            error: function(xhr, textStatus) {
              if ( options.ajaxCache && !caches[cacheKey] ) {
                caches[cacheKey] = {status: 'error', textStatus: textStatus, xhr: xhr};
              }

              if (isActive) {
                if (optionError) {
                  optionError.call(link, xhr, textStatus, $jtooltipmap, $jtooltipmapInner);
                } else {
                  $jtooltipmapInner.html('<i>sorry, the contents could not be loaded</i>');
                }
              }
            },
            success: function(data, textStatus, xhr) {
              if ( options.ajaxCache && !caches[cacheKey] ) {
                caches[cacheKey] = {status: 'success', data: data, textStatus: textStatus, xhr: xhr};
              }

              tooltipmapContents = opts.ajaxProcess.call(link, data);

              // allow for changing the title based on data returned by xhr
              if ( typeof tooltipmapContents == 'object' && tooltipmapContents !== null ) {
                tipTitle = tooltipmapContents.title;
                tooltipmapContents = tooltipmapContents.content;
              }

              if (isActive) {
                if (optionSuccess) {
                  optionSuccess.call(link, data, textStatus, $jtooltipmap, $jtooltipmapInner);
                }
                $jtooltipmapInner.html(tooltipmapContents);

              }
            },
            complete: function(xhr, textStatus) {
              if (optionComplete) {
                optionComplete.call(link, xhr, textStatus, $jtooltipmap, $jtooltipmapInner);
              }
              var imgs = $jtooltipmapInner[0].getElementsByTagName('img');
              imgCount = imgs.length;
              for (var i=0, l = imgs.length; i < l; i++) {
                if (imgs[i].complete) {
                  imgCount--;
                }
              }
              if (imgCount && !$j.browser.opera) {
                $j(imgs).bind('load.ct error.ct', function() {
                  imgCount--;
                  if (imgCount === 0) {
                    $jtooltipmapWait.hide();
                    $j(imgs).unbind('.ct');
                    if (isActive) { tooltipmapShow(pY); }
                  }
                });
              } else {
                $jtooltipmapWait.hide();
                if (isActive) { tooltipmapShow(pY); }
              }
            }
          };

          ajaxMergedSettings = $j.extend(true, {}, opts.ajaxSettings, ajaxSettings);

          if ( caches[cacheKey] ) {
            cachedAjax( caches[cacheKey], ajaxMergedSettings );
          } else {
            $j.ajax(ajaxMergedSettings);
          }
        }

/***************************************
* load an element from the same page
***************************************/
      } else if (opts.local) {
        var $jlocalContent = $j(tipAttribute + (/^#\S+$j/.test(tipAttribute) ? '' : ':eq(' + index + ')')).clone(true).show();
        if (opts.localIdSuffix) {
          $jlocalContent.attr('id', $jlocalContent[0].id + opts.localIdSuffix);
        }
        $jtooltipmapInner.html($jlocalContent);
        tooltipmapShow(pY);
      }
    };

// get dimensions and options for tooltipmap and prepare it to be shown
    var tooltipmapShow = function(bpY) {
      var $jcloseLink, dynamicClasses, heightDiff,
          titleHTML = tipTitle || opts.showTitle && '&nbsp;',
          bgY = '', direction = '';
      $jtooltipmap.addClass('tooltipmap-' + ctClass);
      if (opts.truncate) {
        var $jtruncloaded = $jtooltipmapInner.text().slice(0,opts.truncate) + '...';
        $jtooltipmapInner.html($jtruncloaded);
      }

      if (titleHTML) {
        $jtooltipmapTitle.show().html(titleHTML);
      } else {
        $jtooltipmapTitle.hide();
      }

      if (opts.roma) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	   if (opts.napoli) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	   if (opts.milano) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
		if (opts.bologna) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	   if (opts.firenze) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	   if (opts.torino) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	   if (opts.pisa) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	   if (opts.padova) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	   if (opts.venezia) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	   if (opts.bardonecchia) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
		}
	   if (opts.livorno) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
		}
	   if (opts.verona) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
		}
	   if (opts.genova) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
		}
	   if (opts.trieste) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
		}
	   if (opts.rimini) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	  if (opts.senigallia) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	  if (opts.sorrento) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	  if (opts.arezzo) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	  if (opts.rovereto) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	  if (opts.trento) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
	  if (opts.bari) {
        //$jcloseLink = $j('<div class="tooltipmap-close"><a href="#">' + opts.closeText + '</a></div>');
		$jcloseLink = $j('<div class="tooltipmap-close"><a href="#"><img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="' + opts.closeText + '" width="16" height="16"></a></div>');
        (opts.closePosition == 'bottom') ? $jcloseLink.appendTo($jtooltipmapInner) : (opts.closePosition == 'title') ? $jcloseLink.prependTo($jtooltipmapTitle) : $jcloseLink.prependTo($jtooltipmapInner);
        $jcloseLink.bind('click.tooltipmap', function() {
          tooltipmapClose();
          return false;
        });
		
        if (opts.mouseOutClose) {
          $jtooltipmap.bind('mouseleave.tooltipmap', function() {
            tooltipmapClose();
          });
        } else {
          $jtooltipmap.unbind('mouseleave.tooltipmap');
        }
      }
// now that content is loaded, finish the positioning
      $jtooltipmapOuter.css({zIndex: $jlink.data('tooltipmap').zIndex, overflow: defHeight == 'auto' ? 'visible' : 'auto', height: defHeight});
      tipHeight = defHeight == 'auto' ? Math.max($jtooltipmap.outerHeight(),$jtooltipmap.height()) : parseInt(defHeight,10);
      tipY = posY;
      baseline = sTop + wHeight;
      if (opts.positionBy == 'fixed') {
        tipY = posY - opts.dropShadowSteps + tOffset;
      } else if ( (posX < mouseX && Math.max(posX, 0) + tipWidth > mouseX) || opts.positionBy == 'bottomTop') {
        if (posY + tipHeight + tOffset > baseline && mouseY - sTop > tipHeight + tOffset) {
          tipY = mouseY - tipHeight - tOffset;
          direction = 'top';
        } else {
          tipY = mouseY + tOffset;
          direction = 'bottom';
        }
      } else if ( posY + tipHeight + tOffset > baseline ) {
        tipY = (tipHeight >= wHeight) ? sTop : baseline - tipHeight - tOffset;
      } else if ($jlink.css('display') == 'block' || link.tagName.toLowerCase() == 'area' || opts.positionBy == "mouse") {
        tipY = bpY - tOffset;
      } else {
        tipY = posY - opts.dropShadowSteps;
      }
      if (direction === '') {
        direction = posX < linkLeft ? 'left' :  'right';
      }
      // add classes
      dynamicClasses = ' clue-' + direction + '-' + ctClass + ' tooltipmap-' + ctClass;
      if (ctClass == 'rounded') {
        dynamicClasses += ' ui-corner-all';
      }
      $jtooltipmap.css({top: tipY + 'px'}).attrProp({'className': standardClasses + dynamicClasses});
      // set up arrow positioning to align with element
      if (opts.arrows) {
        if ( /(left|right)/.test(direction) ) {
          heightDiff = $jtooltipmap.height() - $jtooltipmapArrows.height();
          bgY = posX >= 0 && bpY > 0 ? (posY - tipY - opts.dropShadowSteps) : 0;
          bgY = heightDiff > bgY ? bgY : heightDiff;
          bgY += 'px';
        }
        $jtooltipmapArrows.css({top: bgY}).show();
      } else {
        $jtooltipmapArrows.hide();
      }

// (first hide, then) ***SHOW THE tooltipmap***
      // handle dropshadow divs first
      $jdropShadow = createDropShadows($jtooltipmap, opts);
      if ($jdropShadow && $jdropShadow.length) {
        $jdropShadow.hide().css({height: tipHeight, width: tipInnerWidth, zIndex: $jlink.data('tooltipmap').zIndex-1}).show();
      }

      $jtooltipmap.hide()[opts.fx.open](opts.fx.openSpeed || 0);
      if ($j.fn.bgiframe) { $jtooltipmap.bgiframe(); }
      // delayed close (not fully tested)
      if (opts.delayedClose > 0) {
        closeOnDelay = setTimeout(tooltipmapClose, opts.delayedClose);
      }
      // trigger the optional onShow function

      opts.onShow.call(link, $jtooltipmap, $jtooltipmapInner);
    };

/***************************************
   =INACTIVATION
-------------------------------------- */
    var inactivate = function(event) {
      isActive = false;
      $jtooltipmapWait.hide();
   //   if (!opts.roma || (/click|toggle/).test(opts.activation) ) {
    //    tooltipmapClose();
    //    clearTimeout(closeOnDelay);
    //  }
      if (opts.hoverClass) {
        $jlink.removeClass(opts.hoverClass);
      }
    };
// close tooltipmap and reset some things
    var tooltipmapClose = function(el) {
      var $jcloser = el && el.data('tooltipmap') ? el : $jlink,
          ct = $jcloser.data('tooltipmap') && $jcloser.data('tooltipmap').selector,
          ctSelector = ct || 'div.tooltipmap',
          $jtooltipmap = $j(ctSelector),
          $jtooltipmapInner = $jtooltipmap.find(prefix + 'tooltipmap-inner'),
          $jtooltipmapArrows = $jtooltipmap.find(prefix + 'tooltipmap-arrows');

      $jtooltipmap.hide().removeClass();
      opts.onHide.call($jcloser[0], $jtooltipmap, $jtooltipmapInner);
      if (ct) {
        $jcloser.removeClass('tooltipmap-clicked');
        $jcloser.css('cursor','');
      }
      if (ct && tipTitle) {
        $jcloser.attrProp(opts.titleAttribute, tipTitle);
      }

      if (opts.arrows) {
        $jtooltipmapArrows.css({top: ''});
      }
    };

    $j(document).unbind('hidetooltipmap.tooltipmap').bind('hidetooltipmap.tooltipmap', function(e) {

      tooltipmapClose( $j(e.target) );
    });
/***************************************
   =BIND EVENTS
-------------------------------------- */
  // activate by click
      if ( (/click|toggle/).test(opts.activation) ) {
        $jlink.bind('click.tooltipmap', function(event) {
          if ($jtooltipmap.is(':hidden') || !$jlink.is('.tooltipmap-clicked')) {
            activate(event);
            $j('.tooltipmap-clicked').removeClass('tooltipmap-clicked');
            $jlink.addClass('tooltipmap-clicked');
          } else {
            inactivate(event);
          }
          return false;
        });
  // activate by focus; inactivate by blur
      } else if (opts.activation == 'focus') {
        $jlink.bind('focus.tooltipmap', function(event) {
          $jlink.attrProp('title','');
          activate(event);
        });
        $jlink.bind('blur.tooltipmap', function(event) {
          $jlink.attrProp('title', $jlink.data('tooltipmap').title);
          inactivate(event);
        });
  // activate by hover
      } else {
        // clicking is returned false if clickThrough option is set to false
        $jlink[opts.clickThrough ? 'unbind' : 'bind']('click.tooltipmap', returnFalse);
        //set up mouse tracking
        var mouseTracks = function(evt) {
          if (opts.tracking) {
            var trackX = posX - evt.pageX;
            var trackY = tipY ? tipY - evt.pageY : posY - evt.pageY;
            $jlink.bind('mousemove.tooltipmap', function(evt) {
              $jtooltipmap.css({left: evt.pageX + trackX, top: evt.pageY + trackY });
            });
          }
        };
        if ($j.fn.hoverIntent && opts.hoverIntent) {
          $jlink.hoverIntent({
            sensitivity: opts.hoverIntent.sensitivity,
            interval: opts.hoverIntent.interval,
            over: function(event) {
              activate(event);
              mouseTracks(event);
            },
            timeout: opts.hoverIntent.timeout,
            out: function(event) {inactivate(event); $jlink.unbind('mousemove.tooltipmap');}
          });
        } else {
          $jlink.bind('mouseenter.tooltipmap', function(event) {
            activate(event);
            mouseTracks(event);
          })
          .bind('mouseleave.tooltipmap', function(event) {
            inactivate(event);
            $jlink.unbind('mousemove.tooltipmap');
          });
        }

        $jlink.bind('mouseover.tooltipmap', function(event) {
          $jlink.attrProp('title','');
        }).bind('mouseleave.tooltipmap', function(event) {
          $jlink.attrProp('title', $jlink.data('tooltipmap').title);
        });
      }

      // trigger a cached Ajax response
      function cachedAjax(info, settings) {
        var status = info.status;
        settings.beforeSend(info.xhr, settings);
        if ( status == 'error' ) {
          settings[status](info.xhr, info.textStatus);
        } else if (status == 'success') {
          settings[status](info.data, info.textStatus, info.xhr);
        }
        settings.complete(info.xhr, settings.textStatus);
      }

    }); // end this.each

    /** =private functions
    ************************************************************/
    //empty function
    function doNothing() {}

    // create a string to be used as an identifier for ajax caches
    function getCacheKey(url, data) {
      var cacheKey = url || '';
      data = data || '';

      if (typeof data == 'object') {
        $j.each(data, function(key, val) {
          cacheKey += '-' + key + '-' + val;
        });
      } else if (typeof data == 'string') {
        cacheKey += data;
      }

      return cacheKey;
    }

    /** =create dropshadow divs **/

    function createDropShadows($jtooltipmap, options, newDropShadow) {
      var dsStyle = '',
          dropShadowSteps = (options.dropShadow && options.dropShadowSteps) ? +options.dropShadowSteps : 0;

      if ($j.support.boxShadow) {
        if ( dropShadowSteps ) {
          dsStyle = '1px 1px ' + dropShadowSteps + 'px rgba(0,0,0,0.5)';
        }
        var dsOffsets = dropShadowSteps === 0 ? '0 0 ' : '1px 1px ';
        $jtooltipmap.css($j.support.boxShadow, dsStyle);
        return false;
      }
      var oldDropShadow = $jtooltipmap.find('.tooltipmap-drop-shadow');
      if (dropShadowSteps == oldDropShadow.length) {
        return oldDropShadow;
      }
      oldDropShadow.remove();
      var dropShadows = [];
      for (var i=0; i < dropShadowSteps;) {
        dropShadows[i++] = '<div style="top:' + i + 'px;left:' + i + 'px;"></div>';
      }

      newDropShadow = $j(dropShadows.join(''))
      .css({
        position: 'absolute',
        backgroundColor: '#000',
        zIndex: cluezIndex -1,
        opacity: 0.1
      })
      .addClass('tooltipmap-drop-shadow')
      .prependTo($jtooltipmap);
      return newDropShadow;

    }

    return this;
  };

  (function() {
    $j.support = $j.support || {};
    // check support for CSS3 properties (currently only boxShadow)
    var div = document.createElement('div'),
        divStyle = div.style,
        styleProps = ['boxShadow'],
        prefixes = ['moz', 'Moz', 'webkit', 'o'];

    for (var i=0, sl = styleProps.length; i < sl; i++) {
      var prop = styleProps[i],
          uProp = prop.charAt(0).toUpperCase() + prop.slice(1);

      if ( typeof divStyle[ prop ] !== 'undefined' ) {
        $j.support[ prop ] = prop;
      } else {
        for (var j=0, pl = prefixes.length; j < pl; j++) {

          if (typeof divStyle[ prefixes[j] + uProp ] !== 'undefined') {
            $j.support[ prop ] = prefixes[j] + uProp;
            break;
          }
        }
      }
    }
    div = null;
  })();

  $j.fn.tooltipmap.defaults = $j.tooltipmap.defaults;

})(jQuery);
