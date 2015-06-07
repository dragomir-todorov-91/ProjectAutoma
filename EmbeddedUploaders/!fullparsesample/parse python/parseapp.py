# Simple general app to be evolved to save data from sensors to parse.com
import os, sys
from utils import printTitle, printSubTitle, printExplain, printTab, printError

#This is the parse.com application and api keys
APPLICATION_ID = "WxrA9CtdMQ1kVF3sZgxtWdqDxsOhJC1bkvr5NyKL"
REST_API_KEY = "Vq6yZVkcHJUbiCNADmMgwN5ldsvTjvS23cGTQwG7"

# This wont be needed after testing !!!
if APPLICATION_ID != "WxrA9CtdMQ1kVF3sZgxtWdqDxsOhJC1bkvr5NyKL":
    printTitle("You need to create a parse app and supply the auth values")
    sys.exit(-1)

# We will use the ParsePy library
# Importing needed libs
from parse_rest.connection import register, ParseBatcher

# Alias the Object type to make clear is not a normal python Object
from parse_rest.datatypes import Object as ParseObject

# Register the application with the given keys
register(APPLICATION_ID, REST_API_KEY)


# printSubTitle("Parse is a NOSQL database.")
# https://en.wikipedia.org/wiki/NoSQL
# printExplain("So, you dont need to pre-create the data schema, and can drop/add data & columns at will")

# Creating a ParseObject
# Test = ParseObject()

# This is where we fill the object data
# Simple set a value to the object. No need to exist before

# This is how we manipulate the name of the table we are writing in
class TestClass(ParseObject):
    pass

Test = TestClass()

Test.Title = 'Hello world'
Test.Data = '100'


def saveToParse(Test):
    print("Saving...")

    Test.save()

    print("Done!")

saveToParse(Test)

printExplain("Parse automatically add the nexts read-only fields on save:")

printSubTitle("objectId")
printExplain("The objectId is the primary-key of the objects. Is the way to identify this object")
print("The objectId is: ", Test.objectId)

printSubTitle("objectId")
printExplain("The objectId is the primary-key of the objects. Is the way to identify this object")
print("The objectId is: ", Test.objectId)

printSubTitle("createdAt")
printExplain("The createdAt is the date (UTC) when this object was created")
print("The object was created on: ", Test.createdAt)

printSubTitle("updatedAt")
printExplain("The updatedAt is the last date (UTC) the object was modified")
print("The object last update on: ", Test.updatedAt)

'''

print("When the object is created, both dates are the same")

printExplain('You can add new fields anytime')

Test.otherField = True
Test.score = 200

saveToParse(Test)
print("The object last update on: ", Test.updatedAt)

printExplain("In the parse.com Data Browser, you see that is created a table called 'Object'")
print("To have a better name, you need to subclass")

printExplain("If you run this several times, the object will be duplicated")
print("""
In contrast with Sql databases, you need to code the constrains/validations yourself"

And check if a object will duplicate or not the data before to save. Parse.com not
have built-in functionality to constrain the data to avoid duplicated objects or anything
related at all. Only provide the storage, and the default fields
""")

printTitle("Query the data store")

printSubTitle("Query for exact object")
print("You ask for a exact object, you need to query by objectId")

findObject = ParseObject.Query.get(objectId=Test.objectId)

print("The object with objectId = ", Test.objectId, ' exist? ', not(findObject is None))

printSubTitle("To get all the objects, use all()")

# The queryset return a generator. I need to convert to list to count it
# This is not the best way. Ask only for the data you really need
print("Exist %d objects now " % len(list(ParseObject.Query.all())))

printSubTitle("Like Django, Querysets can have constraints added by appending the name of the filter operator")
print "The list of constrains is at https://www.parse.com/docs/rest#queries-constraints"
print "Objects with score>=100 ", len(list(ParseObject.Query.filter(score__gte=100)))


printTitle("A simple news app")
printExplain("Let's build some classes to store news")


class Source(ParseObject):
    pass


class Article(ParseObject):
    pass

printExplain("Get the news from the yahoo rss feed.")
# Feedparser is the popular option for get RSS/Atom feeds
# http://pythonhosted.org/feedparser/

import feedparser

d = feedparser.parse('http://news.yahoo.com/rss/')

printSubTitle('Downloading news from %s' % d.feed.title)
print d.feed.link

printExplain("To model a one-t-many relation, create a Source object and point it to each article")


printExplain("First get the sources that are already created")

sourcesQry = Source.Query.all()

sources = {source.href: source for source in sourcesQry}


def createSource(title, href):
    if href in sources:
        return sources[href]

    source = Source(**locals())
    saveToParse(source)

    sources[source.href] = source

    return source


def createArticle(title, description, source, date):
    article = Article(**locals())

    return article


articles = []
for entry in d.entries:
    # Is a real new with source? The rrs return images and other stuff
    if 'source' in entry:
        source = createSource(**entry.source)

        articles.append(createArticle(
            title=entry.title,
            description=entry.description,
            source=source,
            date=entry.published
        ))

printExplain("To save several objects, use the batcher")

batcher = ParseBatcher()
batcher.batch_save(articles)

print "Our news sources:"

for source in sources.values():
    printTab(source.title)

print "The news from ", sources.values()[0].title

for new in Article.Query.filter(source=sources.values()[0]):
    printSubTitle(new.title)
    print new.description
    
    '''