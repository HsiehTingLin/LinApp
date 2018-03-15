NavbarComponent = require "NavbarComponent"
result = "我的病人"
# this is prepared for hiding the footer

tabbar.states.a =
	backgroundColor: "rgba(255,156,0,1)"
flow = new FlowComponent
flow.showNext(patientList)
flow.footer = tabbar
flow.footer.visible = no 

myNavbar = new NavbarComponent
	# General
	style: "light"
	title: result

	# Search bar
	searchLabel: "Search"
	search: true
	dictation: true
	backAction: -> 
		myNavbar.showPrevious(patientList, animate: false)
		flow.showPrevious(patientList)
		flow.footer.visible = no 
patientName = myNavbar.search
flow.index = 2
launchScreen.index = 1
myNavbar.index = 2
statusbar_light.parent = myNavbar
clickMe.onTap ->
	myNavbar.showNext(myNavbar.search)
	flow.showNext(generalInfo)
	flow.footer.visible = yes
	
#orderBar.onTap ->
#	myNavbar.visible = no
#	flow.showNext(order, animate: false)
