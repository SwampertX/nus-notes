typedef struct A {
  int x, y;
} A;

void A_Init(A *this, int a) {
  this->x = a - 1;
  this->y = 2 * a;
}

int A_Foo(A *this) {
  int s;
  s = this->x * this->y;
  return s;
}

typedef struct Main {
  A *obj;
} Main;

int main() {
  Main *this = malloc(sizeof(Main));
  this->obj = malloc(sizeof(A));
  A_Init(this->obj, 9);
  printf("%d\n", A_Foo(this->obj));
  return 0;
}
