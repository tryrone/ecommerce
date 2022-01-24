import 'package:flutter/material.dart';

import '../../../constants.dart';

class CartCounter extends StatefulWidget {
  const CartCounter({Key? key}) : super(key: key);

  @override
  _CartCounterState createState() => _CartCounterState();
}

class _CartCounterState extends State<CartCounter> {
  int numOfItems = 1;
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        buildOutlineButton(Icons.remove,(){
          setState(() {
            if(numOfItems > 1 ){
              numOfItems --;
            }
          });
        }),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin / 2),
          child: Text(
            numOfItems
            .toString()
            .padLeft(2,"0")
            , 
            style: Theme
            .of(context)
            .textTheme
            .headline6
            ),
        ),
        buildOutlineButton(Icons.add,(){
          setState(() {
            numOfItems = numOfItems + 1;
          });
        }),
      ],
    );
  }

  SizedBox buildOutlineButton(IconData icon, Function press) {
    return SizedBox(
      width: 40,
      height: 32,
      child: OutlineButton(
        padding: EdgeInsets.zero,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(13)),
        onPressed: () => press(),
        child: Icon(icon),
      ),
    );
  }
}
