class A {
  Int x, y;

  void Init(Int a) {
    x = a - 1;
    y = 2 * a;
  }

  Int Foo() {
    Int s;

    s = x * y;
    Return s;
  }
}

class Main {
  A obj;

  Void main() {
    obj.Init(9);

    println(obj.Foo());
  }
}
