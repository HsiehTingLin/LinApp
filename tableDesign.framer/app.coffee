
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

scroll1 = new ScrollComponent
	parent: labShow	
	height: 528
	width: screen.width

	scrollHorizontal: false
	y: 90
	backgroundColor: "EFEFF4"
	scroll.directionLock = true 
	
scroll2 = new ScrollComponent
	height: (cardHight + padding)*labels.length + padding
	scrollVertical: false
	width: cardWidth 
	x: Align.center
	scroll.mouseWheelEnabled = true

scroll3 = new ScrollComponent
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