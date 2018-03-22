#Opening Animation
flow_ptList = new FlowComponent
#flow_ptList.showNext(launchScreen)
flow_ptList.showNext(login)
#Basic Config
searchResault = "12B病房" # Change the name here if needed
patientName = "林霆阿妹"
backToList.text = "回" + searchResault

flow_tabbar = new FlowComponent
flow_tabbar.visible = no 
filter.visible = yes 
logInBtn.onTap ->
	flow_ptList.showOverlayBottom(patientList)
	navBar_ptList.visible = !navBar_ptList.visible
logOut.onTap ->
	flow_ptList.showOverlayTop(login)
	navBar_ptList.showPrevious()
	navBar_ptList.visible = !navBar_ptList.visible
	toSetting.visible = !toSetting.visible
	filter.visible = !filter.visible
NavbarComponent = require "NavbarComponent"
navBar_ptList = new NavbarComponent
	# General
	style: "light"
	title: searchResault
	size: "small"
	# back button setting
	# if the current flow is patient list, do different function  
	backAction: -> 
		# here need a if else switch 
		if flow_ptList.current == setting
			navBar_ptList.showPrevious()
			flow_ptList.showPrevious()
			toSetting.visible = !toSetting.visible
			filter.visible = !filter.visible
		else
			flow_ptList.showOverlayCenter(filterSetting)

navBar_ptList.visible = no
navBar_tabbar = new NavbarComponent
	style: "light"
	title: patientName
	size: "small"
	backAction: -> 
		navBar_tabbar.showPrevious()
		flow_tabbar.showPrevious()
navBar_tabbar.visible = no 
statusbar2.parent = navBar_tabbar	
statusbar1.parent = navBar_ptList



#filter and setting
toSetting.parent = navBar_ptList 
toSetting.onTap ->
	navBar_ptList.showNext("設定")
	flow_ptList.showNext(setting,animations: false)
	toSetting.visible = no
	filter.visible = !filter.visible
filter.parent = navBar_ptList

#Scroll Component Config
ptlistScroll = new ScrollComponent
	parent: patientList
	width: screen.width
	height: 670
	scrollHorizontal: false
patientListContent.parent = ptlistScroll.content
patientNameInList.text = patientName 
#note scroll config
noteScroll = new ScrollComponent
	parent: generalInfo
	width: screen.width
	scrollHorizontal: false
	y: 64
	height: 670
noteScrollContent.parent = noteScroll.content
#orderScroll config
orderScroll = new ScrollComponent
	parent: order
	width: screen.width
	scrollHorizontal: false
	y: 64
	height: 670
orderScrollContent.parent = orderScroll.content

#emrScroll

emrScroll = new ScrollComponent
	parent: emr
	width: screen.width
	scrollHorizontal: false
	y: 64
	height: 670
emrScrollContent.parent = emrScroll.content

#pacsScroll
pacsScroll = new ScrollComponent
	parent: pacs
	width: screen.width
	scrollHorizontal: false
	y: 64
	height: 670
pacsScrollContent.parent = pacsScroll.content

#Go into a patient data 
#Please remember to put all your code in  intend

patientListContent.onTap ->
	flow_tabbar.visible = !flow_tabbar.visible
	navBar_ptList.visible = !navBar_ptList.visible
	navBar_tabbar.visible = !navBar_tabbar.visible
	flow_ptList.showOverlayBottom(flow_tabbar)
	flow_tabbar.showNext(generalInfo)
	flow_tabbar.footer = tabbar

orderBar.onTap ->
	navBar_tabbar.showNext("Order")
	flow_tabbar.showNext(order)
infoBar.onTap ->
	navBar_tabbar.showNext(patientName)
	flow_tabbar.showNext(generalInfo)
emrBar.onTap ->
	navBar_tabbar.showNext("EMR")
	flow_tabbar.showNext(emr)
labTPRBar.onTap ->
	navBar_tabbar.showNext("TPR")
	flow_tabbar.showNext(labTPR_TPR)
pacsBar.onTap ->
	navBar_tabbar.showNext("PACS")
	flow_tabbar.showNext(pacs)
noteScrollContent.onTap ->
	navBar_tabbar.showNext("Admission")
	flow_tabbar.showNext(noteShow)
orderScrollContent.onTap ->
	navBar_tabbar.showNext("Drugs Name")
	flow_tabbar.showNext(orderShow)
pacsScrollContent.onTap ->
	navBar_tabbar.showNext("MRI 20180313")
	flow_tabbar.showNext(pacsShow)
emrItem.onTap ->
	navBar_tabbar.showNext("item")
	flow_tabbar.showNext(emrShow)
		


#Back To List: put this line at the last line very important
backToList.parent = navBar_tabbar 
backToList.onTap -> 
	flow_ptList.showPrevious()
	navBar_ptList.visible = yes
	navBar_tabbar.visible = !navBar_tabbar.visible 
