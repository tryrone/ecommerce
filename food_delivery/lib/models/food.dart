class Food {
  String imgUrl;
  String desc;
  String name;
  String waitTime;
  num score;
  String cal;
  num price;
  num quantity;
  List<Map<String, String>> ingredients;
  String about;
  bool highLight;

  Food(this.imgUrl, this.desc, this.name, this.waitTime, this.score, this.cal,
      this.price, this.quantity, this.ingredients, this.about,
      {this.highLight = false});

  static List<Food> generateRecommendFoods() {
    return [
      Food(
        'assets/images/dish1.png', 
        'No 1. in sales', 
        'Soba Soup', 
        '50 min', 
        4.8, 
        '325 kcal', 
        12, 
        1, 
        [
          {
            'Noodle': 'assets/images/ingre1.png',
          },
          {
            'Shrimp': 'assets/images/ingre2.png',
          },
          {
            'Egg': 'assets/images/ingre3.png',
          },
          {
            'Scallion': 'assets/images/ingre4.png',
          },
        ], 
        'Simply put, ramen is a Japanese noodle soup, with a combination of rich flavoured broth one of a variety of types of noodles and a selection of meats and vegetables, often topped with a boiled egg',
        highLight: true
        ),
      Food(
        'assets/images/dish2.png', 
        'Low Fat', 
        'Sai Ua Samun Phrai', 
        '50 min', 
        4.8, 
        '325 kcal', 
        12, 
        1, 
        [
          {
            'Noodle': 'assets/images/ingre1.png',
          },
          {
            'Shrimp': 'assets/images/ingre2.png',
          },
          {
            'Egg': 'assets/images/ingre3.png',
          },
          {
            'Scallion': 'assets/images/ingre4.png',
          },
        ], 
       'Simply put, ramen is a Japanese noodle soup, with a combination of rich flavoured broth one of a variety of types of noodles and a selection of meats and vegetables, often topped with a boiled egg',
        ),
      Food(
        'assets/images/dish3.png', 
        'Highly Recommended', 
        'Ratatouille Pasta', 
        '50 min', 
        4.8, 
        '325 kcal', 
        17, 
        0, 
        [
          {
            'Noodle': 'assets/images/ingre1.png',
          },
          {
            'Shrimp': 'assets/images/ingre2.png',
          },
          {
            'Egg': 'assets/images/ingre3.png',
          },
          {
            'Scallion': 'assets/images/ingre4.png',
          },
        ], 
        'Simply put, ramen is a Japanese noodle soup, with a combination of rich flavoured broth one of a variety of types of noodles and a selection of meats and vegetables, often topped with a boiled egg',
        ),
    ];
  }


  static List<Food> generatePopularFoods(){
    return[
      Food(
        'assets/images/dish4.png', 
        'Most Popular', 
        'Tomato Chicken', 
        '50 min', 
        4.8, 
        '325 kcal', 
        17, 
        0, 
        [
          {
            'Noodle': 'assets/images/ingre1.png',
          },
          {
            'Shrimp': 'assets/images/ingre2.png',
          },
          {
            'Egg': 'assets/images/ingre3.png',
          },
          {
            'Scallion': 'assets/images/ingre4.png',
          },
        ], 
        'Simply put, ramen is a Japanese noodle soup, with a combination of rich flavoured broth one of a variety of types of noodles and a selection of meats and vegetables, often topped with a boiled egg',
        highLight: true
        ),
      Food(
        'assets/images/dish1.png', 
        'No 1. in sales', 
        'Soba Soup', 
        '50 min', 
        4.8, 
        '325 kcal', 
        12, 
        1, 
        [
          {
            'Noodle': 'assets/images/ingre1.png',
          },
          {
            'Shrimp': 'assets/images/ingre2.png',
          },
          {
            'Egg': 'assets/images/ingre3.png',
          },
          {
            'Scallion': 'assets/images/ingre4.png',
          },
        ], 
        'Simply put, ramen is a Japanese noodle soup, with a combination of rich flavoured broth one of a variety of types of noodles and a selection of meats and vegetables, often topped with a boiled egg',
        ),
      
    ];
  }


}
