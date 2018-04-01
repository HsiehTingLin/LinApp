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
done.onTap ->
	flow_ptList.showPrevious()
cancel.onTap ->
	flow_ptList.showPrevious()

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

#flow Control
flowing = (btn, title, goTo) ->
	btn.onTap ->
		navBar_tabbar.showNext(title) #title is a string
		flow_tabbar.showNext(goTo)		
flowing(orderBar, "Order",order)
flowing(infoBar,patientName,generalInfo)
flowing(emrBar,"EMR",emr)
flowing(labTPRBar,"TPR",labTPR_TPR)
flowing(pacsBar,"PACS",pacs)
flowing(noteScrollContent,"Admission",noteShow)
flowing(orderScrollContent,"Drugs Name",orderShow)
flowing(pacsScrollContent,"MRI 20180313",pacsShow)
flowing(emrScroll,"item",emrShow)
flowing(leftTpr,"TPR",labTPR_TPR)
flowing(rightLab,"Lab",labTPR_Lab)
flowing(cardLab,"生化",labShow)

#Back To List: put this line at the last line very important
backToList.parent = navBar_tabbar 
backToList.onTap -> 
	flow_ptList.showPrevious()
	navBar_ptList.visible = yes
	navBar_tabbar.visible = !navBar_tabbar.visible 


#Lab Config
array = [[1,2],[1,2]]
#print(array[1][1])

cardHight = 55
margin = 10
cardWidth = Screen.width 
padding = 10
cards = []
names = ["AST", "ALT", "BUN", "Cr"]
valueHight = 50
valueWidth = 40
valuePadding = 20

values = ["11","23","11","22","11","23","22","33","11","22"]
labels = ["AST","ALT","BUN","Creatine","Na","K","Cl","HCO3-","a","a","a"]
datesText = ["01/21","01/22","01/23","01/24","01/25","01/26","01/27","01/27","01/27","01/27"]
dates = []

horizontalWidth = (index) -> 
	return (valueWidth+ valuePadding)*index + valuePadding

scroll1_lab = new ScrollComponent
	parent: labShow	
	height: 528
	width: screen.width

	scrollHorizontal: false
	y: 86
	backgroundColor: "EFEFF4"
	scroll.directionLock = true 
	
scroll2_lab = new ScrollComponent
	height: (cardHight + padding)*labels.length + padding
	scrollVertical: false
	width: cardWidth 
	x: Align.center
	scroll.mouseWheelEnabled = true

scroll3_lab = new ScrollComponent
	parent: labShow
	height: 20
	scrollVertical: false
	width: cardWidth 
	x: Align.center
	borderWidth: 
		bottom: 0.5 
	borderColor: "8E8E93"
	contentInset: 
		right: 20
	shadowSpread: 1
	shadowColor: "rgba(215,215,215,0.5)"
	shadowY: 2
	shadowBlur: 5
	
for i in [0...labels.length]

	card = new Layer
		width: cardWidth
		height: cardHight
		y: (cardHight + padding)*i + padding
		clip: true
		parent: scroll1_lab.content
		backgroundColor: "ffffff"

		fontSize: "12px"
	card.onTap ->
		print("Hello World")
	label = new TextLayer
		fontSize: 14
		color: "3F434A"
		x: margin 
		y: (cardHight + padding)*i + padding + 8
		parent: scroll1_lab.content
		superLayer: card
		text: labels[i]
		backgroundColor: "d2d2d2"
		borderRadius: 25
		padding:
			left: 10	
			right: 10
		for j in [0...values.length]
			value = new TextLayer
				width: valueWidth
				height: cardHight
				fontSize: 18
				padding:
					top:30
				x: horizontalWidth(j) 
				y: (cardHight + padding)*i + padding
				
				parent: scroll2_lab.content
			value.text = values[j]
	cards.push(card)
scroll2_lab.parent = scroll1_lab.content

for k in [0..9]
	date = new TextLayer
		width: valueWidth
		fontSize: 14
		top:40
		x: horizontalWidth(k)
		text: datesText[k]
		parent: scroll3_lab.content 
scroll2_lab.onMove ->
	scroll3_lab.scrollX = scroll2_lab.scrollX
#scroll3_lab.onMove ->
#	scroll2_lab.scrollX = scroll3_lab.scrollX
scroll3_lab.y = scroll1_lab.y - 20


today = 4
scroll2_lab.onClick ->
	scroll2.scrollToPoint(
		x: horizontalWidth(today)
		true
		curve: Bezier.ease, time: .5
	)
   

#TPR Config
array = [[1,2],[1,2]]
#print(array[1][1])

cardHight = 55
margin = 10
cardWidth = Screen.width 
padding = 10
cards = []
names = ["AST", "ALT", "BUN", "Cr"]
valueHight = 50
valueWidth = 40
valuePadding = 20
graphHight = 200

values = ["11","23","11","22","11","23","22","33","11","22"]
labels = ["Temp.","Pulse","Resp.","Systolic Pressure","Diastolic Pressure","SaO2","pH","input","output","Blood Sugar","whatever"]
datesText = ["01/21","01/22","01/23","01/24","01/25","01/26","01/27","01/27","01/27","01/27"]
dates = []

horizontalWidth = (index) -> 
	return (valueWidth+ valuePadding)*index + valuePadding

scroll1 = new ScrollComponent
	parent: labTPR_TPR
	height: 528
	width: screen.width

	scrollHorizontal: false
	y: 86 + graphHight
	backgroundColor: "EFEFF4"
	scroll.directionLock = true 
	
scroll2 = new ScrollComponent
	height: (cardHight + padding)*labels.length + padding
	scrollVertical: false
	width: cardWidth 
	x: Align.center
	scroll.mouseWheelEnabled = true

scroll3 = new ScrollComponent
	parent: labTPR_TPR
	height: 20
	scrollVertical: false
	width: cardWidth 
	x: Align.center
	borderWidth: 
		bottom: 0.5 
	borderColor: "8E8E93"
	contentInset: 
		right: 20
	shadowSpread: 1
	shadowColor: "rgba(215,215,215,0.5)"
	shadowY: 2
	shadowBlur: 5
	
for i in [0...labels.length]

	card = new Layer
		width: cardWidth
		height: cardHight
		y: (cardHight + padding)*i + padding
		clip: true
		parent: scroll1.content
		backgroundColor: "ffffff"

		fontSize: "12px"
	card.onTap ->
		print("Hello World")
	label = new TextLayer
		fontSize: 14
		color: "3F434A"
		x: margin 
		y: (cardHight + padding)*i + padding + 8
		parent: scroll1.content
		superLayer: card
		text: labels[i]
		backgroundColor: "d2d2d2"
		borderRadius: 25
		padding:
			left: 10	
			right: 10
		for j in [0...values.length]
			value = new TextLayer
				width: valueWidth
				height: cardHight
				fontSize: 18
				padding:
					top:30
				x: horizontalWidth(j) 
				y: (cardHight + padding)*i + padding
				
				parent: scroll2.content
			value.text = values[j]
	cards.push(card)
scroll2.parent = scroll1.content

for k in [0..9]
	date = new TextLayer
		width: valueWidth
		fontSize: 14
		top:40
		x: horizontalWidth(k)
		text: datesText[k]
		parent: scroll3.content 
scroll2.onMove ->
	scroll3.scrollX = scroll2.scrollX
scroll3.y = scroll1.y - 20

today = 4
scroll2.onClick ->
	scroll2.scrollToPoint(
		x: horizontalWidth(today)
		true
		curve: Bezier.ease, time: .5
	)
