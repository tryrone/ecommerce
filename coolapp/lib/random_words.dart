import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

class RandomWords extends StatefulWidget {
  const RandomWords({Key? key}) : super(key: key);

  @override
  _RandomWordsState createState() => _RandomWordsState();
}

class _RandomWordsState extends State<RandomWords> {
  final _randomWordPairs = <WordPair>[];
  final _savedWordPairs = Set<WordPair>();

  Widget _buildList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemBuilder: (context, item) {
        if (item.isOdd) return Divider();

        final index = item ~/ 2;

        if (index >= _randomWordPairs.length) {
          _randomWordPairs.addAll(generateWordPairs().take(10));
        }

        return _buildRow(_randomWordPairs[index]);
      },
    );
  }

  Widget _buildRow(WordPair pair) {
    final _alreadySaved = _savedWordPairs.contains(pair);
    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: TextStyle(fontSize: 18),
      ),
      trailing: Icon(
        _alreadySaved ? Icons.favorite : Icons.favorite_border,
        color: _alreadySaved ? Colors.red[600] : null,
      ),
      onTap: () {
        setState(() {
          if (_alreadySaved) {
            _savedWordPairs.remove(pair);
          } else {
            _savedWordPairs.add(pair);
          }
        });
      },
    );
  }

  void _pushSaved() {
    Navigator.of(context).push(MaterialPageRoute(
      builder: (BuildContext context) {
        final Iterable<ListTile> tiles = _savedWordPairs.map((WordPair pair) {
          return ListTile(
            title: Text(
              pair.asPascalCase,
              style: TextStyle(
                fontSize: 16,
              ),
            ),
          );
        });

        final List<Widget> divided = ListTile.divideTiles(
          context: context,
          tiles: tiles
          ).toList();
        
        return Scaffold(
          appBar: AppBar(
            title: Text('Saved Word Pairs'),
            backgroundColor: Colors.purple[900],
          ),
          body: tiles.length == 0 ? Center(child: Text('No Saved Word.')) : 
           ListView(
              children: divided,
          )
        );
      },
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('WordPair Generator'),
        backgroundColor: Colors.purple[900],
        actions: <Widget>[
          IconButton(onPressed: _pushSaved, icon: Icon(Icons.list)),
        ],
      ),
      body: _buildList(),
    );
  }
}
