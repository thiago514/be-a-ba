
class Card:
    def __init__(self, title, description, value):
        self.title = title
        self.description = description
        self.value = value

    def getJSONParceable(self):
        return {
            "title": self.title,
            "description": self.description,
            "value": self.value
        }

class Chart:
    def __init__(self, title):
       self.title = title

    def getJSONParceable(self):
        return {
            "title": self.title
        }

class  KeyValueChart(Chart):
    def __init__(self, title, values : dict):
        super().__init__(title)
        self.values = values

    def getJSONParceable(self):
        json = super().getJSONParceable()
        json.update({
            "values": self.values
        })
        return json
        
# class MultipleValueChart(Chart):
#     def __init__(self, title, values : list):
#         super().__init__(title)
#         self.values = values

#     def getJSONParceable(self):
        
#         return super().getJSONParceable().update({
#             "values": self.values
#         })


class Dashboard:


    def __init__(self):
        self.cards = []
        self.charts = []
    
    def addCard(self, card : Card):
        self.cards.append(card)
    
    def addChart(self, chart : Chart):
        self.charts.append(chart)

    def getJSONParceable(self):
        return {
            "cards": [card.getJSONParceable() for card in self.cards],
            "charts": [chart.getJSONParceable() for chart in self.charts]
        }
    