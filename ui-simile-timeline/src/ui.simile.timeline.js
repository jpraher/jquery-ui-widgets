/*
 * Copyright (c) 2011 Jakob Praher
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

// Event  
// http://code.google.com/p/simile-widgets/wiki/Timeline_EventSourceJSON_jsDate

// icon - url. This image will appear next to the title text in the timeline if (no end date) or (durationEvent = false). If a start and end date are supplied, and durationEvent is true, the icon is not shown. If icon attribute is not set, a default icon from the theme is used.
// image - url to an image that will be displayed in the bubble
// link - url. The bubble's title text be a hyper-link to this address.
// color - color of the text and tape (duration events) to display in the timeline. If the event has durationEvent = false, then the bar's opacity will be applied (default 20%). See durationEvent, above.
// textColor - color of the label text on the timeline. If not set, then the color attribute will be used.
// tapeImage and tapeRepeat Sets the background image and repeat style for the event's tape (or 'bar') on the Timeline. Overrides the color setting for the tape. Repeat style should be one of {repeat | repeat-x | repeat-y}, repeat is the default. See the Cubism example for a demonstration. Only applies to duration events.
// caption - additional event information shown when mouse is hovered over the Timeline tape or label. Uses the html title property. Looks like a tooltip. Plain text only. See the cubism example.
// classname - added to the HTML classnames for the event's label and tape divs. Eg classname attribute 'hot_event' will result in div classes of 'timeline-event-label hot_event' and 'timeline-event-tape hot_event' for the event's Timeline label and tape, respectively.
// description - will be displayed inside the bubble with the event's title and image.
// XML Format: the description is stored as the text content of the event element (see below). Note: the XML standard requires that an element's text content must be escaped/formatted HTML.
// JSON Format: the description key of the event hash

(function ($) {

var DateTime = {
    MONTH: 'MONTH',
    YEAR: 'YEAR'    
}
var TimelineWidget  = {
    
/*
         dateEvent, //start
         dateEvent, //end
         dateEvent, //latestStart
         dateEvent, //earliestEnd
         true, //instant
         “Event ” + i, //text
         “Description for Event ” + i //description
*/
    _init: function() {
        // console.log("initializing TimelineWidget!");
        // console.log(this.element);
        this.setEventSource(new Timeline.DefaultEventSource(0));
        this.setHeight(this.getHeight());
	this.setWidth(this.getWidth());
	this.setBorder(this.getBorder());
	this.draw();
    },

    setHeight: function(height) {
	this.options.height = height;
        this.element.css({height: height});
    },
    getHeight: function() { return this.options.height; },
    setWidth: function(width) {
	this.options.width = width;
        this.element.css({width: width});
    },
    getWidth: function() { return this.options.width; },
    setBorder: function(border) {
	this.options.border = border;
        this.element.css({border: border});
    },
    getBorder: function() { return this.options.border; },



    setEventSource : function(source) {
        this.options.eventSource = source;
        this._trigger('change', 0, source);
    },

    getEventSource : function() {
        return this.options.eventSource;
    },

    clearAllEvents: function() {
	this.setEventSource(new Timeline.DefaultEventSource(0));
	this.draw();
    },

    addEvents: function(events) {
	var eventSource = this.getEventSource();
	for (var i = 0; i < events.length; ++i) {
	    var evt = new Timeline.DefaultEventSource.Event(events[i]);
	    eventSource.add(evt)
	}
	this.draw();
    },

    draw: function() {
        var optionBandInfos = this.options.bandInfos;
	var bandInfos = new Array(optionBandInfos.length);
	for (var i = 0; i < optionBandInfos.length; ++i ) {
	    var obj = $.extend({}, optionBandInfos[i]);
	    // obj.prototype = optionBandInfos[i];
	    if (obj.intervalUnit) {
		obj.intervalUnit = Timeline.DateTime[obj.intervalUnit];
	    }
	    bandInfos[i] = Timeline.createBandInfo(obj);
	    bandInfos[i].eventSource = this.getEventSource();
	    if (obj.syncWith != null) bandInfos[i].syncWith = obj.syncWith;
	    if (obj.highlight != null) bandInfos[i].highlight = obj.highlight;
	}
	this.options.tl = Timeline.create(this.element.context, bandInfos);
    },

    off: function() {
	this.element.css({background: 'none'});
	this._trigger('done');
	this.destroy(); // use the predefined function
    },

    options: {
        height: '150px',
	width: '100%',
        border: '1px solid #aaa',
        eventSource:  null,
        bandInfos: [
	  {
              width:          "70%",
	      intervalUnit:   DateTime.MONTH,
	      intervalPixels: 100
	  },
	  {
	      width:          "30%",
	      intervalUnit:   DateTime.YEAR,
	      intervalPixels: 200,
	      syncWith:  0,
	      highlight: true
	  }]
    }
};

$.widget("ui.similetimeline", TimelineWidget);

 })(jQuery);