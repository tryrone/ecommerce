import 'package:flutter/material.dart';

import '../../../constants.dart';

class ColorDot extends StatelessWidget {
  final Color color;
  final bool isSelected;
  const ColorDot({
    Key? key,
    required final this.color,
    final this.isSelected = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(
          top: kDefaultPaddin / 4, 
          right: kDefaultPaddin / 2
          ),
      height: 24,
      width: 24,
      padding: const EdgeInsets.all(2.5),
      decoration: BoxDecoration(
          border: Border.all(color: isSelected ?  color : Colors.transparent),
          shape: BoxShape.circle
          ),
      child:  DecoratedBox(
        decoration: BoxDecoration(
          color: color,
          shape: BoxShape.circle, 
          ),
      ),
    );
  }
}
