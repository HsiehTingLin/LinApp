flow_ptList = new FlowComponent
flow_ptList.showNext(launchScreen)
go.onTap ->
	flow_ptList.showNext(patientList)
	
NavbarComponent = require "NavbarComponent"
myNavbar = new NavbarComponent
	# General
	style: "light"
	title: "12B病房"
	size: "small"

	# Search bar
	backAction: -> 
		myNavbar.showPrevious()
		flow_ptList.showPrevious()
statusbar1.parent = myNavbar

toLeft.onTap ->
	myNavbar.showNext("oh no")
	flow_ptList.showNext(setting,animations: false)
	
myNavbar2 = new NavbarComponent
	style: "light"
	title: "林大儒"
	size: "small"
	backAction: -> 
		myNavbar2.showPrevious()
		flow_tabbar.showPrevious()
myNavbar2.visible = no 
statusbar_light2.parent = myNavbar2	
flow_tabbar = new FlowComponent
flow_tabbar.visible = no 

# Please remember to put all your code in  intend
goToPatient.onTap ->
	flow_tabbar.visible = !flow_tabbar.visible
	myNavbar.visible = !myNavbar.visible
	myNavbar2.visible = !myNavbar2.visible
	flow_ptList.showOverlayBottom(flow_tabbar)
	flow_tabbar.showNext(generalInfo)
	flow_tabbar.footer = tabbar
	fly.onTap ->
		myNavbar2.showNext("order")
		flow_tabbar.showNext(order)
	back4.onTap ->
		flow_tabbar.showPrevious()
	orderBar.onTap ->
		myNavbar2.showNext("order")
		flow_tabbar.showNext(order)
	infoBar.onTap ->
		flow_tabbar.showNext(generalInfo)


# put this line at the last line very important
back3.parent = myNavbar2 
back3.onTap -> 
	flow_ptList.showPrevious()
	myNavbar.visible = yes
	myNavbar2.visible = !myNavbar2.visible 
