NavbarComponent = require "NavbarComponent"
myNavbar = new NavbarComponent
	# General
	style: "light"
	title: "Title"

	# Search bar
	searchLabel: "Search"
	search: true
	dictation: true

flow = new FlowComponent
flow.showNext(launchScreen)

