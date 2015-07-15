angular.module('orggue')
	.filter('linkUsername', function(randomcolor) {
		return function(text) {
			return '<a class="hashtag-link" href="http://twitter.com/' + text.slice(1) + '">' + text + '</a>';
		};
	})
	.filter('linkHashtag', function() {
		return function(text) {
			return '<a class="hashtag-link" href="http://twitter.com/search/%23' + text.slice(1) + '">' + text + '</a>';
		};
	})
	.filter('tweet', function() {
		return function(text) {
			var urlRegex = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/g;
			var twitterUserRegex = /@([a-zA-Z0-9_]{1,20})/g;
			var twitterHashTagRegex = /\B#(\w+)/g;

			text = text.replace(urlRegex," <a class='hashtag-link' href='$&' target='_blank'>$&</a>").trim();
			text = text.replace(twitterUserRegex,"<a class='hashtag-link' href='http://www.twitter.com/$1' target='_blank'>@$1</a>");
			text = text.replace(twitterHashTagRegex,"<a class='hashtag-link' href='http://twitter.com/search/%23$1' target='_blank'>#$1</a>");

			return text;
		};
	});
