#Basic Config
searchResault = "12B病房" # Change the name here if needed
patientName = "林大儒"
backToList.text = "回" + searchResault
flow_ptList = new FlowComponent
flow_ptList.showNext(login)
flow_tabbar = new FlowComponent
flow_tabbar.visible = no 
logInBtn.onTap ->
	flow_ptList.showOverlayBottom(patientList)
	navBar_ptList.visible = !navBar_ptList.visible
logOut.onTap ->
	flow_ptList.showOverlayTop(login)
	navBar_ptList.showPrevious()
	navBar_ptList.visible = !navBar_ptList.visible
	toSetting.visible = !toSetting.visible
NavbarComponent = require "NavbarComponent"
navBar_ptList = new NavbarComponent
	# General
	style: "light"
	title: searchResault
	size: "small"

	# Search bar
	backAction: -> 
		navBar_ptList.showPrevious()
		flow_ptList.showPrevious()
		toSetting.visible = !toSetting.visible
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
#Interaction begin
toSetting.parent = navBar_ptList 
toSetting.onTap ->
	navBar_ptList.showNext("設定")
	flow_ptList.showNext(setting,animations: false)
	toSetting.visible = no

#Go into a patient data 
#Please remember to put all your code in  intend

goToPatient.onTap ->
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
		
		


#Back To List: put this line at the last line very important
backToList.parent = navBar_tabbar 
backToList.onTap -> 
	flow_ptList.showPrevious()
	navBar_ptList.visible = yes
	navBar_tabbar.visible = !navBar_tabbar.visible 
