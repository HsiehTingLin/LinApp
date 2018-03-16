flow1 = new FlowComponent
flow1.showNext(topView)
go.onTap ->
	flow1.showNext(firstView)
	
NavbarComponent = require "NavbarComponent"
myNavbar = new NavbarComponent
	# General
	style: "light"
	title: "12B病房"
	size: "small"

	# Search bar
	backAction: -> 
		myNavbar.showPrevious()
		flow1.showPrevious()
statusbar1.parent = myNavbar

toLeft.onTap ->
	myNavbar.showNext("oh no")
	flow1.showNext(secondView,animations: false)
	
toRight.onTap ->
	flow1.showPrevious()
myNavbar2 = new NavbarComponent
	style: "light"
	title: "林大儒"
	size: "small"
	backAction: -> 
		myNavbar2.showPrevious()
		flow2.showPrevious()
myNavbar2.visible = no 
statusbar_light2.parent = myNavbar2	
flow2 = new FlowComponent
flow2.visible = no 

# Please remember to put all your code in  intend
goToPatient.onTap ->
	flow2.visible = !flow2.visible
	myNavbar.visible = !myNavbar.visible
	myNavbar2.visible = !myNavbar2.visible
	flow1.showOverlayBottom(flow2)
	flow2.showNext(thirdView)
	flow2.footer = tabbar
	fly.onTap ->
		myNavbar2.showNext("order")
		flow2.showNext(forthView)
	back4.onTap ->
		flow2.showPrevious()
	orderBar.onTap ->
		myNavbar2.showNext("order")
		flow2.showNext(forthView)
	infoBar.onTap ->
		flow2.showNext(thirdView)


# put this line at the last line very important
back3.parent = myNavbar2 
back3.onTap -> 
	flow1.showPrevious()
	myNavbar.visible = yes
	myNavbar2.visible = !myNavbar2.visible 
