Require Coq.Setoids.Setoid.

(* recursive definition *)
Inductive Boolean : Set :=
  | T: Boolean
  | F: Boolean
(* curried *)
  | and : Boolean -> Boolean -> Boolean
  | or : Boolean -> Boolean -> Boolean
  | not : Boolean -> Boolean.

Axiom Identity_and :
  forall (X:Boolean), (and X T) = X.


Axiom Identity_or :
  forall (X:Boolean), (or X F) = X.

Axiom Complementation_and :
  forall (X:Boolean), (and X (not X)) = F.

Axiom Complementation_or :
  forall (X:Boolean), (or X (not X)) = T.

Axiom Associativity_and :
  forall (X:Boolean),
  forall (Y:Boolean),
  forall (Z:Boolean),
    (and (and X Y) Z) = (and X (and Y Z)).

Axiom Associativity_or :
  forall (X:Boolean),
  forall (Y:Boolean),
  forall (Z:Boolean),
    (or (or X Y) Z) = (or X (or Y Z)).

Axiom Commutativity_and :
  forall (X:Boolean),
  forall (Y:Boolean),
    (and X Y) = (and Y X).

Axiom Commutativity_or :
  forall (X:Boolean),
  forall (Y:Boolean),
    (or X Y) = (or Y X).

Axiom Distributivity_and :
  forall (X:Boolean),
  forall (Y:Boolean),
  forall (Z:Boolean),
    (and X (or Y Z)) = (or (and X Y) (and X Z)).

Axiom Distributivity_or :
  forall (X:Boolean),
  forall (Y:Boolean),
  forall (Z:Boolean),
    (or X (and Y Z)) = (and (or X Y) (or X Z)).

Theorem Idempotence_and:
  forall (X: Boolean),
    (and X X) = X.
Proof.
  intro.
  rewrite <- (Identity_or (and X X)).
  rewrite <- (Complementation_and X).
  rewrite <- (Distributivity_and).
  rewrite(Complementation_or).
  rewrite(Identity_and).
  reflexivity.
Qed.

Require Import LibTactics.

Theorem Idempotence_or:
  forall (X: Boolean),
    (or X X) = X.
  Proof.
    intro.
    (* rewrite <- (Idempotence_and X) at 1. *)
    (* rewrite <- (Identity_and X) at 3. *)
    (* rewrite <- (Distributivity_and). *)
    (* rewrite(Identity_or X). *)

Theorem Annihilator_and:
  forall (X: Boolean),
    (and X F) = F.
  Admitted.

Theorem Annihilator_or:
  forall (X: Boolean),
    (or X F) = F.
  Admitted.

Theorem Absorption_and:
  forall (X: Boolean),
  forall (Y: Boolean),
    (and X (or X Y)) = X.
  Admitted.

Theorem Absorption_or:
  forall (X: Boolean),
  forall (Y: Boolean),
    (or X (and X Y)) = X.
  Admitted.


Theorem Unicity_F:
  forall (F1: Boolean),
    (forall (X:Boolean), (or X F1) = X) -> F1 = F.
Proof.
  intro F1.
  intro H0.
  rewrite <- (Identity_or) at 1.
  rewrite <- (Commutativity_or).
  apply(H0).
Qed.
